<?php
declare(strict_types=1);

// Repo entity test

require_once __DIR__ . '/../githubrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RepoEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GithubRestSDK::test(null, null);
        $ent = $testsdk->Repo(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "repo" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = GithubRestSDK::test($seed, null);
        $seen = iterator_to_array($base->Repo(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = GithubRestConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = GithubRestSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Repo(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = repo_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "repo." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_REPO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $repo_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.repo")));
        $repo_ref01_data = null;
        if (count($repo_ref01_data_raw) > 0) {
            $repo_ref01_data = Helpers::to_map($repo_ref01_data_raw[0][1]);
        }

        // LIST
        $repo_ref01_ent = $client->Repo(null);
        $repo_ref01_match = [
            "org_id" => $setup["idmap"]["org01"],
        ];

        $repo_ref01_list_result = $repo_ref01_ent->list($repo_ref01_match, null);
        $this->assertIsArray($repo_ref01_list_result);

        // LOAD
        $repo_ref01_match_dt0 = [
            "id" => $repo_ref01_data["id"],
        ];
        $repo_ref01_data_dt0_loaded = $repo_ref01_ent->load($repo_ref01_match_dt0, null);
        $repo_ref01_data_dt0_load_result = Helpers::to_map($repo_ref01_data_dt0_loaded);
        $this->assertNotNull($repo_ref01_data_dt0_load_result);
        $this->assertEquals($repo_ref01_data_dt0_load_result["id"], $repo_ref01_data["id"]);

    }
}

function repo_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/repo/RepoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GithubRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["repo01", "repo02", "repo03", "org01", "org02", "org03", "user01", "user02", "user03", "owner01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GITHUBREST_TEST_REPO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GITHUBREST_TEST_REPO_ENTID" => $idmap,
        "GITHUBREST_TEST_LIVE" => "FALSE",
        "GITHUBREST_TEST_EXPLAIN" => "FALSE",
        "GITHUBREST_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GITHUBREST_TEST_REPO_ENTID"]);
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
