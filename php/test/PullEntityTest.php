<?php
declare(strict_types=1);

// Pull entity test

require_once __DIR__ . '/../githubrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PullEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GithubRestSDK::test(null, null);
        $ent = $testsdk->Pull(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = pull_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "pull." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_PULL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $pull_ref01_ent = $client->Pull(null);
        $pull_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.pull"), "pull_ref01"));
        $pull_ref01_data["owner"] = $setup["idmap"]["owner01"];
        $pull_ref01_data["repo"] = $setup["idmap"]["repo01"];

        $pull_ref01_data_result = $pull_ref01_ent->create($pull_ref01_data, null);
        $pull_ref01_data = Helpers::to_map($pull_ref01_data_result);
        $this->assertNotNull($pull_ref01_data);
        $this->assertNotNull($pull_ref01_data["id"]);

        // LIST
        $pull_ref01_match = [
            "owner" => $setup["idmap"]["owner01"],
            "repo" => $setup["idmap"]["repo01"],
        ];

        $pull_ref01_list_result = $pull_ref01_ent->list($pull_ref01_match, null);
        $this->assertIsArray($pull_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($pull_ref01_list_result),
            ["id" => $pull_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // LOAD
        $pull_ref01_match_dt0 = [
            "id" => $pull_ref01_data["id"],
        ];
        $pull_ref01_data_dt0_loaded = $pull_ref01_ent->load($pull_ref01_match_dt0, null);
        $pull_ref01_data_dt0_load_result = Helpers::to_map($pull_ref01_data_dt0_loaded);
        $this->assertNotNull($pull_ref01_data_dt0_load_result);
        $this->assertEquals($pull_ref01_data_dt0_load_result["id"], $pull_ref01_data["id"]);

    }
}

function pull_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/pull/PullTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GithubRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["pull01", "pull02", "pull03", "repo01", "repo02", "repo03", "owner01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GITHUBREST_TEST_PULL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GITHUBREST_TEST_PULL_ENTID" => $idmap,
        "GITHUBREST_TEST_LIVE" => "FALSE",
        "GITHUBREST_TEST_EXPLAIN" => "FALSE",
        "GITHUBREST_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GITHUBREST_TEST_PULL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GITHUBREST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["GITHUBREST_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new GithubRestSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["GITHUBREST_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["GITHUBREST_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
