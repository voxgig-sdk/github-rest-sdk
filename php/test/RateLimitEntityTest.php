<?php
declare(strict_types=1);

// RateLimit entity test

require_once __DIR__ . '/../githubrest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class RateLimitEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = GithubRestSDK::test(null, null);
        $ent = $testsdk->RateLimit(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = rate_limit_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "rate_limit." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_RATE_LIMIT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $rate_limit_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.rate_limit")));
        $rate_limit_ref01_data = null;
        if (count($rate_limit_ref01_data_raw) > 0) {
            $rate_limit_ref01_data = Helpers::to_map($rate_limit_ref01_data_raw[0][1]);
        }

        // LOAD
        $rate_limit_ref01_ent = $client->RateLimit(null);
        $rate_limit_ref01_match_dt0 = [];
        [$rate_limit_ref01_data_dt0_loaded, $err] = $rate_limit_ref01_ent->load($rate_limit_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($rate_limit_ref01_data_dt0_loaded);

    }
}

function rate_limit_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/rate_limit/RateLimitTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = GithubRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["rate_limit01", "rate_limit02", "rate_limit03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("GITHUBREST_TEST_RATE_LIMIT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "GITHUBREST_TEST_RATE_LIMIT_ENTID" => $idmap,
        "GITHUBREST_TEST_LIVE" => "FALSE",
        "GITHUBREST_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["GITHUBREST_TEST_RATE_LIMIT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["GITHUBREST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
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
