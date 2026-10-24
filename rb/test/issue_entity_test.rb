# Issue entity test

require "minitest/autorun"
require "json"
require_relative "../GithubRest_sdk"
require_relative "runner"

class IssueEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GithubRestSDK.test(nil, nil)
    ent = testsdk.Issue(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GithubRestConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GithubRestSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Issue(nil).list({ "owner" => 1, "repo" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
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
    if setup[:live]
      ["owner01", "repo01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GITHUB_REST_TEST_ISSUE_ENTID")
        end
      end
    end
    client = setup[:client]

    # CREATE
    issue_ref01_ent = client.Issue(nil)
    issue_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.issue"), "issue_ref01"))
    issue_ref01_data["owner"] = setup[:idmap]["owner01"]
    issue_ref01_data["repo"] = setup[:idmap]["repo01"]

    issue_ref01_data_result = issue_ref01_ent.create(issue_ref01_data, nil)
    issue_ref01_data = Helpers.to_map(issue_ref01_data_result.respond_to?(:data_get) ? issue_ref01_data_result.data_get : issue_ref01_data_result)
    assert !issue_ref01_data.nil?
    assert !issue_ref01_data["id"].nil?

    # LIST
    issue_ref01_match = {
      "owner" => setup[:idmap]["owner01"],
      "repo" => setup[:idmap]["repo01"],
    }

    issue_ref01_list_result = issue_ref01_ent.list(issue_ref01_match, nil)
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

    issue_ref01_resdata_up0_result = issue_ref01_ent.update(issue_ref01_data_up0_up, nil)
    issue_ref01_resdata_up0 = Helpers.to_map(issue_ref01_resdata_up0_result.respond_to?(:data_get) ? issue_ref01_resdata_up0_result.data_get : issue_ref01_resdata_up0_result)
    assert !issue_ref01_resdata_up0.nil?
    assert_equal issue_ref01_resdata_up0["id"], issue_ref01_data_up0_up["id"]
    assert_equal issue_ref01_resdata_up0[issue_ref01_markdef_up0_name], issue_ref01_markdef_up0_value

    # LOAD
    issue_ref01_match_dt0 = {
      "id" => issue_ref01_data["id"],
    }
    issue_ref01_match_dt0["owner"] = setup[:idmap]["owner"] || setup[:idmap]["owner01"]
    issue_ref01_match_dt0["repo"] = setup[:idmap]["repo"] || setup[:idmap]["repo01"]
    issue_ref01_data_dt0_loaded = issue_ref01_ent.load(issue_ref01_match_dt0, nil)
    issue_ref01_data_dt0_load_result = Helpers.to_map(issue_ref01_data_dt0_loaded.respond_to?(:data_get) ? issue_ref01_data_dt0_loaded.data_get : issue_ref01_data_dt0_loaded)
    assert !issue_ref01_data_dt0_load_result.nil?
    assert_equal issue_ref01_data_dt0_load_result["id"], issue_ref01_data["id"]

  end
end

def issue_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "issue", "IssueTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GITHUB_REST_TEST_ISSUE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GITHUB_REST_TEST_ISSUE_ENTID" => idmap,
    "GITHUB_REST_TEST_LIVE" => "FALSE",
    "GITHUB_REST_TEST_EXPLAIN" => "FALSE",
    "GITHUB_REST_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GITHUB_REST_TEST_ISSUE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["owner"].nil?
    idmap_resolved["owner"] = idmap_resolved["owner01"]
  end
  if idmap_resolved["repo"].nil?
    idmap_resolved["repo"] = idmap_resolved["repo01"]
  end

  if env["GITHUB_REST_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["GITHUB_REST_APIKEY"],
      },
      extra || {},
    ])
    client = GithubRestSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GITHUB_REST_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GITHUB_REST_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
