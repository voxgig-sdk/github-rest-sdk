-- Pull entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("github-rest_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("PullEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Pull(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Pull(nil):list({ ["owner"] = 1, ["repo"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = pull_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "pull." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _, _live_key in ipairs({"owner01", "repo01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via GITHUB_REST_TEST_PULL_ENTID")
        end
      end
    end
    local client = setup.client

    -- CREATE
    local pull_ref01_ent = client:Pull(nil)
    local pull_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.pull"), "pull_ref01"))
    pull_ref01_data["owner"] = setup.idmap["owner01"]
    pull_ref01_data["repo"] = setup.idmap["repo01"]

    local pull_ref01_data_result, err = pull_ref01_ent:create(pull_ref01_data, nil)
    assert.is_nil(err)
    pull_ref01_data = helpers.to_map(type(pull_ref01_data_result) == 'table' and pull_ref01_data_result.data_get and pull_ref01_data_result:data_get() or pull_ref01_data_result)
    assert.is_not_nil(pull_ref01_data)
    assert.is_not_nil(pull_ref01_data["id"])

    -- LIST
    local pull_ref01_match = {
      ["owner"] = setup.idmap["owner01"],
      ["repo"] = setup.idmap["repo01"],
    }

    local pull_ref01_list_result, err = pull_ref01_ent:list(pull_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(pull_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(pull_ref01_list_result),
      { id = pull_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- LOAD
    local pull_ref01_match_dt0 = {
      id = pull_ref01_data["id"],
    }
    pull_ref01_match_dt0["owner"] = setup.idmap["owner"] or setup.idmap["owner01"]
    pull_ref01_match_dt0["repo"] = setup.idmap["repo"] or setup.idmap["repo01"]
    local pull_ref01_data_dt0_loaded, err = pull_ref01_ent:load(pull_ref01_match_dt0, nil)
    assert.is_nil(err)
    local pull_ref01_data_dt0_load_result = helpers.to_map(type(pull_ref01_data_dt0_loaded) == 'table' and pull_ref01_data_dt0_loaded.data_get and pull_ref01_data_dt0_loaded:data_get() or pull_ref01_data_dt0_loaded)
    assert.is_not_nil(pull_ref01_data_dt0_load_result)
    assert.are.equal(pull_ref01_data_dt0_load_result["id"], pull_ref01_data["id"])

  end)
end)

function pull_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/pull/PullTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read pull test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "pull01", "pull02", "pull03", "repo01", "repo02", "repo03", "owner01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("GITHUB_REST_TEST_PULL_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GITHUB_REST_TEST_PULL_ENTID"] = idmap,
    ["GITHUB_REST_TEST_LIVE"] = "FALSE",
    ["GITHUB_REST_TEST_EXPLAIN"] = "FALSE",
    ["GITHUB_REST_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["GITHUB_REST_TEST_PULL_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["GITHUB_REST_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["GITHUB_REST_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["GITHUB_REST_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["GITHUB_REST_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
