<?php
declare(strict_types=1);

// StarWars SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class StarWarsSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new StarWarsUtility();
        $this->_utility = $utility;

        $config = StarWarsConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = StarWarsHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = StarWarsHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, StarWarsFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return StarWarsUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = StarWarsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = StarWarsHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = StarWarsHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new StarWarsSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = StarWarsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = StarWarsHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_film = null;

    // Canonical facade: $client->Film()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->film()
    // resolves here too.
    public function Film($data = null)
    {
        require_once __DIR__ . '/entity/film_entity.php';
        if ($data === null) {
            if ($this->_film === null) {
                $this->_film = new FilmEntity($this, null);
            }
            return $this->_film;
        }
        return new FilmEntity($this, $data);
    }


    private $_people_list = null;

    // Canonical facade: $client->PeopleList()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->people_list()
    // resolves here too.
    public function PeopleList($data = null)
    {
        require_once __DIR__ . '/entity/people_list_entity.php';
        if ($data === null) {
            if ($this->_people_list === null) {
                $this->_people_list = new PeopleListEntity($this, null);
            }
            return $this->_people_list;
        }
        return new PeopleListEntity($this, $data);
    }


    private $_person = null;

    // Canonical facade: $client->Person()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->person()
    // resolves here too.
    public function Person($data = null)
    {
        require_once __DIR__ . '/entity/person_entity.php';
        if ($data === null) {
            if ($this->_person === null) {
                $this->_person = new PersonEntity($this, null);
            }
            return $this->_person;
        }
        return new PersonEntity($this, $data);
    }


    private $_planet = null;

    // Canonical facade: $client->Planet()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->planet()
    // resolves here too.
    public function Planet($data = null)
    {
        require_once __DIR__ . '/entity/planet_entity.php';
        if ($data === null) {
            if ($this->_planet === null) {
                $this->_planet = new PlanetEntity($this, null);
            }
            return $this->_planet;
        }
        return new PlanetEntity($this, $data);
    }


    private $_species = null;

    // Canonical facade: $client->Species()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->species()
    // resolves here too.
    public function Species($data = null)
    {
        require_once __DIR__ . '/entity/species_entity.php';
        if ($data === null) {
            if ($this->_species === null) {
                $this->_species = new SpeciesEntity($this, null);
            }
            return $this->_species;
        }
        return new SpeciesEntity($this, $data);
    }


    private $_starship = null;

    // Canonical facade: $client->Starship()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->starship()
    // resolves here too.
    public function Starship($data = null)
    {
        require_once __DIR__ . '/entity/starship_entity.php';
        if ($data === null) {
            if ($this->_starship === null) {
                $this->_starship = new StarshipEntity($this, null);
            }
            return $this->_starship;
        }
        return new StarshipEntity($this, $data);
    }


    private $_vehicle = null;

    // Canonical facade: $client->Vehicle()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->vehicle()
    // resolves here too.
    public function Vehicle($data = null)
    {
        require_once __DIR__ . '/entity/vehicle_entity.php';
        if ($data === null) {
            if ($this->_vehicle === null) {
                $this->_vehicle = new VehicleEntity($this, null);
            }
            return $this->_vehicle;
        }
        return new VehicleEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new StarWarsSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
