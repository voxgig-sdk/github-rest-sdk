-- Issue entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("github-rest_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("IssueEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Issue(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = issue_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "issue." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_ISSUE_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local issue_ref01_ent = client:Issue(nil)
    local issue_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.issue"), "issue_ref01"))
    issue_ref01_data["owner"] = setup.idmap["owner01"]
    issue_ref01_data["repo"] = setup.idmap["repo01"]

    local issue_ref01_data_result, err = issue_ref01_ent:create(issue_ref01_data, nil)
    assert.is_nil(err)
    issue_ref01_data = helpers.to_map(issue_ref01_data_result)
    assert.is_not_nil(issue_ref01_data)
    assert.is_not_nil(issue_ref01_data["id"])

    -- LIST
    local issue_ref01_match = {
      ["owner"] = setup.idmap["owner01"],
      ["repo"] = setup.idmap["repo01"],
    }

    local issue_ref01_list_result, err = issue_ref01_ent:list(issue_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(issue_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(issue_ref01_list_result),
      { id = issue_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    -- UPDATE
    local issue_ref01_data_up0_up = {
      id = issue_ref01_data["id"],
      ["owner"] = setup.idmap["owner"],
      ["repo"] = setup.idmap["repo"],
    }

    local issue_ref01_markdef_up0_name = "body"
    local issue_ref01_markdef_up0_value = "Mark01-issue_ref01_" .. tostring(setup.now)
    issue_ref01_data_up0_up[issue_ref01_markdef_up0_name] = issue_ref01_markdef_up0_value

    local issue_ref01_resdata_up0_result, err = issue_ref01_ent:update(issue_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local issue_ref01_resdata_up0 = helpers.to_map(issue_ref01_resdata_up0_result)
    assert.is_not_nil(issue_ref01_resdata_up0)
    assert.are.equal(issue_ref01_resdata_up0["id"], issue_ref01_data_up0_up["id"])
    assert.are.equal(issue_ref01_resdata_up0[issue_ref01_markdef_up0_name], issue_ref01_markdef_up0_value)

    -- LOAD
    local issue_ref01_match_dt0 = {
      id = issue_ref01_data["id"],
    }
    local issue_ref01_data_dt0_loaded, err = issue_ref01_ent:load(issue_ref01_match_dt0, nil)
    assert.is_nil(err)
    local issue_ref01_data_dt0_load_result = helpers.to_map(issue_ref01_data_dt0_loaded)
    assert.is_not_nil(issue_ref01_data_dt0_load_result)
    assert.are.equal(issue_ref01_data_dt0_load_result["id"], issue_ref01_data["id"])

  end)
end)

function issue_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/issue/IssueTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read issue test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "issue01", "issue02", "issue03", "repo01", "repo02", "repo03", "owner01" },
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
  local entid_env_raw = os.getenv("GITHUBREST_TEST_ISSUE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["GITHUBREST_TEST_ISSUE_ENTID"] = idmap,
    ["GITHUBREST_TEST_LIVE"] = "FALSE",
    ["GITHUBREST_TEST_EXPLAIN"] = "FALSE",
    ["GITHUBREST_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["GITHUBREST_TEST_ISSUE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["owner"] == nil then
    idmap_resolved["owner"] = idmap_resolved["owner01"]
  end
  if idmap_resolved["repo"] == nil then
    idmap_resolved["repo"] = idmap_resolved["repo01"]
  end

  if env["GITHUBREST_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["GITHUBREST_APIKEY"],
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
