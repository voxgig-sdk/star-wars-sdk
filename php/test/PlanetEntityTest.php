<?php
declare(strict_types=1);

// Planet entity test

require_once __DIR__ . '/../starwars_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PlanetEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = StarWarsSDK::test(null, null);
        $ent = $testsdk->Planet(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = planet_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "planet." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set STARWARS_TEST_PLANET_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $planet_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.planet")));
        $planet_ref01_data = null;
        if (count($planet_ref01_data_raw) > 0) {
            $planet_ref01_data = Helpers::to_map($planet_ref01_data_raw[0][1]);
        }

        // LIST
        $planet_ref01_ent = $client->Planet(null);
        $planet_ref01_match = [];

        [$planet_ref01_list_result, $err] = $planet_ref01_ent->list($planet_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($planet_ref01_list_result);

        // LOAD
        $planet_ref01_match_dt0 = [];
        [$planet_ref01_data_dt0_loaded, $err] = $planet_ref01_ent->load($planet_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($planet_ref01_data_dt0_loaded);

    }
}

function planet_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/planet/PlanetTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = StarWarsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["planet01", "planet02", "planet03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("STARWARS_TEST_PLANET_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "STARWARS_TEST_PLANET_ENTID" => $idmap,
        "STARWARS_TEST_LIVE" => "FALSE",
        "STARWARS_TEST_EXPLAIN" => "FALSE",
        "STARWARS_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["STARWARS_TEST_PLANET_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["STARWARS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["STARWARS_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new StarWarsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["STARWARS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["STARWARS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
