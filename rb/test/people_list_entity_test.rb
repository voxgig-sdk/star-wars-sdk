# PeopleList entity test

require "minitest/autorun"
require "json"
require_relative "../StarWars_sdk"
require_relative "runner"

class PeopleListEntityTest < Minitest::Test
  def test_create_instance
    testsdk = StarWarsSDK.test(nil, nil)
    ent = testsdk.PeopleList(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = people_list_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    [].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "people_list." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set STARWARS_TEST_PEOPLE_LIST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    people_list_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.people_list")))
    people_list_ref01_data = nil
    if people_list_ref01_data_raw.length > 0
      people_list_ref01_data = Helpers.to_map(people_list_ref01_data_raw[0][1])
    end

  end
end

def people_list_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "people_list", "PeopleListTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = StarWarsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["people_list01", "people_list02", "people_list03"],
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
  entid_env_raw = ENV["STARWARS_TEST_PEOPLE_LIST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "STARWARS_TEST_PEOPLE_LIST_ENTID" => idmap,
    "STARWARS_TEST_LIVE" => "FALSE",
    "STARWARS_TEST_EXPLAIN" => "FALSE",
    "STARWARS_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["STARWARS_TEST_PEOPLE_LIST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["STARWARS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["STARWARS_APIKEY"],
      },
      extra || {},
    ])
    client = StarWarsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["STARWARS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["STARWARS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
