-- Repo entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("github-rest_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("RepoEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Repo(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = repo_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "repo." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_REPO_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local repo_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.repo")))
    local repo_ref01_data = nil
    if #repo_ref01_data_raw > 0 then
      repo_ref01_data = helpers.to_map(repo_ref01_data_raw[1][2])
    end

    -- LIST
    local repo_ref01_ent = client:Repo(nil)
    local repo_ref01_match = {
      ["org_id"] = setup.idmap["org01"],
    }

    local repo_ref01_list_result, err = repo_ref01_ent:list(repo_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(repo_ref01_list_result)

    -- LOAD
    local repo_ref01_match_dt0 = {
      id = repo_ref01_data["id"],
    }
    local repo_ref01_data_dt0_loaded, err = repo_ref01_ent:load(repo_ref01_match_dt0, nil)
    assert.is_nil(err)
    local repo_ref01_data_dt0_load_result = helpers.to_map(repo_ref01_data_dt0_loaded)
    assert.is_not_nil(repo_ref01_data_dt0_load_result)
    assert.are.equal(repo_ref01_data_dt0_load_result["id"], repo_ref01_data["id"])

  end)
end)

function repo_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/repo/RepoTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read repo test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "repo01", "repo02", "repo03", "org01", "org02", "org03", "user01", "user02", "user03", "owner01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("GITHUBREST_TEST_REPO_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GITHUBREST_TEST_REPO_ENTID"] = idmap,
    ["GITHUBREST_TEST_LIVE"] = "FALSE",
    ["GITHUBREST_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["GITHUBREST_TEST_REPO_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["GITHUBREST_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["GITHUBREST_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["GITHUBREST_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
