# Issue entity test

require "minitest/autorun"
require "json"
require_relative "../GithubRest_sdk"
require_relative "runner"

class IssueEntityTest < Minitest::Test
  def test_create_instance
    testsdk = GithubRestSDK.test(nil, nil)
    ent = testsdk.Issue(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = issue_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "issue." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_ISSUE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    issue_ref01_ent = client.Issue(nil)
    issue_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.issue"), "issue_ref01"))
    issue_ref01_data["owner"] = setup[:idmap]["owner01"]
    issue_ref01_data["repo"] = setup[:idmap]["repo01"]

    issue_ref01_data_result, err = issue_ref01_ent.create(issue_ref01_data, nil)
    assert_nil err
    issue_ref01_data = Helpers.to_map(issue_ref01_data_result)
    assert !issue_ref01_data.nil?
    assert !issue_ref01_data["id"].nil?

    # LIST
    issue_ref01_match = {
      "owner" => setup[:idmap]["owner01"],
      "repo" => setup[:idmap]["repo01"],
    }

    issue_ref01_list_result, err = issue_ref01_ent.list(issue_ref01_match, nil)
    assert_nil err
    assert issue_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(issue_ref01_list_result),
      { "id" => issue_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    issue_ref01_data_up0_up = {
      "id" => issue_ref01_data["id"],
      "owner" => setup[:idmap]["owner"],
      "repo" => setup[:idmap]["repo"],
    }

    issue_ref01_markdef_up0_name = "body"
    issue_ref01_markdef_up0_value = "Mark01-issue_ref01_#{setup[:now]}"
    issue_ref01_data_up0_up[issue_ref01_markdef_up0_name] = issue_ref01_markdef_up0_value

    issue_ref01_resdata_up0_result, err = issue_ref01_ent.update(issue_ref01_data_up0_up, nil)
    assert_nil err
    issue_ref01_resdata_up0 = Helpers.to_map(issue_ref01_resdata_up0_result)
    assert !issue_ref01_resdata_up0.nil?
    assert_equal issue_ref01_resdata_up0["id"], issue_ref01_data_up0_up["id"]
    assert_equal issue_ref01_resdata_up0[issue_ref01_markdef_up0_name], issue_ref01_markdef_up0_value

    # LOAD
    issue_ref01_match_dt0 = {
      "id" => issue_ref01_data["id"],
    }
    issue_ref01_data_dt0_loaded, err = issue_ref01_ent.load(issue_ref01_match_dt0, nil)
    assert_nil err
    issue_ref01_data_dt0_load_result = Helpers.to_map(issue_ref01_data_dt0_loaded)
    assert !issue_ref01_data_dt0_load_result.nil?
    assert_equal issue_ref01_data_dt0_load_result["id"], issue_ref01_data["id"]

  end
end

def issue_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "issue", "IssueTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GithubRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["issue01", "issue02", "issue03", "repo01", "repo02", "repo03", "owner01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["GITHUBREST_TEST_ISSUE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GITHUBREST_TEST_ISSUE_ENTID" => idmap,
    "GITHUBREST_TEST_LIVE" => "FALSE",
    "GITHUBREST_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["GITHUBREST_TEST_ISSUE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["owner"].nil?
    idmap_resolved["owner"] = idmap_resolved["owner01"]
  end
  if idmap_resolved["repo"].nil?
    idmap_resolved["repo"] = idmap_resolved["repo01"]
  end

  if env["GITHUBREST_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = GithubRestSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GITHUBREST_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GITHUBREST_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
