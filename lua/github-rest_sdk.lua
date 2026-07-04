-- GithubRest SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local GithubRestSDK = {}
GithubRestSDK.__index = GithubRestSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

GithubRestSDK._make_feature = _make_feature


function GithubRestSDK.new(options)
  local self = setmetatable({}, GithubRestSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function GithubRestSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function GithubRestSDK:get_utility()
  return Utility.copy(self._utility)
end


function GithubRestSDK:get_root_ctx()
  return self._rootctx
end


function GithubRestSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function GithubRestSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:branch():list() / client:branch():load({ id = ... })
function GithubRestSDK:branch(data)
  local EntityMod = require("entity.branch_entity")
  if data == nil then
    if self._branch == nil then
      self._branch = EntityMod.new(self, nil)
    end
    return self._branch
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:branch() instead.
function GithubRestSDK:Branch(data)
  local EntityMod = require("entity.branch_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:commit():list() / client:commit():load({ id = ... })
function GithubRestSDK:commit(data)
  local EntityMod = require("entity.commit_entity")
  if data == nil then
    if self._commit == nil then
      self._commit = EntityMod.new(self, nil)
    end
    return self._commit
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:commit() instead.
function GithubRestSDK:Commit(data)
  local EntityMod = require("entity.commit_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:gist():list() / client:gist():load({ id = ... })
function GithubRestSDK:gist(data)
  local EntityMod = require("entity.gist_entity")
  if data == nil then
    if self._gist == nil then
      self._gist = EntityMod.new(self, nil)
    end
    return self._gist
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:gist() instead.
function GithubRestSDK:Gist(data)
  local EntityMod = require("entity.gist_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:issue():list() / client:issue():load({ id = ... })
function GithubRestSDK:issue(data)
  local EntityMod = require("entity.issue_entity")
  if data == nil then
    if self._issue == nil then
      self._issue = EntityMod.new(self, nil)
    end
    return self._issue
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:issue() instead.
function GithubRestSDK:Issue(data)
  local EntityMod = require("entity.issue_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:notification():list() / client:notification():load({ id = ... })
function GithubRestSDK:notification(data)
  local EntityMod = require("entity.notification_entity")
  if data == nil then
    if self._notification == nil then
      self._notification = EntityMod.new(self, nil)
    end
    return self._notification
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:notification() instead.
function GithubRestSDK:Notification(data)
  local EntityMod = require("entity.notification_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:org():list() / client:org():load({ id = ... })
function GithubRestSDK:org(data)
  local EntityMod = require("entity.org_entity")
  if data == nil then
    if self._org == nil then
      self._org = EntityMod.new(self, nil)
    end
    return self._org
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:org() instead.
function GithubRestSDK:Org(data)
  local EntityMod = require("entity.org_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:pull():list() / client:pull():load({ id = ... })
function GithubRestSDK:pull(data)
  local EntityMod = require("entity.pull_entity")
  if data == nil then
    if self._pull == nil then
      self._pull = EntityMod.new(self, nil)
    end
    return self._pull
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:pull() instead.
function GithubRestSDK:Pull(data)
  local EntityMod = require("entity.pull_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:rate_limit():list() / client:rate_limit():load({ id = ... })
function GithubRestSDK:rate_limit(data)
  local EntityMod = require("entity.rate_limit_entity")
  if data == nil then
    if self._rate_limit == nil then
      self._rate_limit = EntityMod.new(self, nil)
    end
    return self._rate_limit
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:rate_limit() instead.
function GithubRestSDK:RateLimit(data)
  local EntityMod = require("entity.rate_limit_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:repo():list() / client:repo():load({ id = ... })
function GithubRestSDK:repo(data)
  local EntityMod = require("entity.repo_entity")
  if data == nil then
    if self._repo == nil then
      self._repo = EntityMod.new(self, nil)
    end
    return self._repo
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:repo() instead.
function GithubRestSDK:Repo(data)
  local EntityMod = require("entity.repo_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:search():list() / client:search():load({ id = ... })
function GithubRestSDK:search(data)
  local EntityMod = require("entity.search_entity")
  if data == nil then
    if self._search == nil then
      self._search = EntityMod.new(self, nil)
    end
    return self._search
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:search() instead.
function GithubRestSDK:Search(data)
  local EntityMod = require("entity.search_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:user():list() / client:user():load({ id = ... })
function GithubRestSDK:user(data)
  local EntityMod = require("entity.user_entity")
  if data == nil then
    if self._user == nil then
      self._user = EntityMod.new(self, nil)
    end
    return self._user
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:user() instead.
function GithubRestSDK:User(data)
  local EntityMod = require("entity.user_entity")
  return EntityMod.new(self, data)
end




function GithubRestSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = GithubRestSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return GithubRestSDK
