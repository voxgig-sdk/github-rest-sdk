# Repo entity test

require "minitest/autorun"
require "json"
require_relative "../GithubRest_sdk"
require_relative "runner"

class RepoEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = GithubRestSDK.test(nil, nil)
    ent = testsdk.Repo(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = GithubRestConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = GithubRestSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Repo(nil).list({ "org_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = repo_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "repo." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["username01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via GITHUB_REST_TEST_REPO_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    repo_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.repo")))
    repo_ref01_data = nil
    if repo_ref01_data_raw.length > 0
      repo_ref01_data = Helpers.to_map(repo_ref01_data_raw[0][1])
    end

    # LIST
    repo_ref01_ent = client.Repo(nil)
    repo_ref01_match = {
      "username" => setup[:idmap]["username01"],
    }

    repo_ref01_list_result = repo_ref01_ent.list(repo_ref01_match, nil)
    assert repo_ref01_list_result.is_a?(Array)

  end
end

def repo_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "repo", "RepoTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GithubRestSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["repo01", "repo02", "repo03", "org01", "org02", "org03", "user01", "user02", "user03", "username01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["GITHUB_REST_TEST_REPO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GITHUB_REST_TEST_REPO_ENTID" => idmap,
    "GITHUB_REST_TEST_LIVE" => "FALSE",
    "GITHUB_REST_TEST_EXPLAIN" => "FALSE",
    "GITHUB_REST_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["GITHUB_REST_TEST_REPO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
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
