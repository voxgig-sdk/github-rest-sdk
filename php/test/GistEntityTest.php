<?php
declare(strict_types=1);

// Gist entity test

require_once __DIR__ . '/../githubrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GistEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GithubRestSDK::test(null, null);
        $ent = $testsdk->Gist(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = gist_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "gist." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_GIST_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $gist_ref01_ent = $client->Gist(null);
        $gist_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.gist"), "gist_ref01"));

        $gist_ref01_data_result = $gist_ref01_ent->create($gist_ref01_data, null);
        $gist_ref01_data = Helpers::to_map($gist_ref01_data_result);
        $this->assertNotNull($gist_ref01_data);
        $this->assertNotNull($gist_ref01_data["id"]);

        // LIST
        $gist_ref01_match = [];

        $gist_ref01_list_result = $gist_ref01_ent->list($gist_ref01_match, null);
        $this->assertIsArray($gist_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($gist_ref01_list_result),
            ["id" => $gist_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

    }
}

function gist_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/gist/GistTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GithubRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["gist01", "gist02", "gist03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GITHUBREST_TEST_GIST_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GITHUBREST_TEST_GIST_ENTID" => $idmap,
        "GITHUBREST_TEST_LIVE" => "FALSE",
        "GITHUBREST_TEST_EXPLAIN" => "FALSE",
        "GITHUBREST_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GITHUBREST_TEST_GIST_ENTID"]);
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
