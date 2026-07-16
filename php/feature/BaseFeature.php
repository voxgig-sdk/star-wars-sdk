<?php
declare(strict_types=1);

// StarWars SDK base feature

class StarWarsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(StarWarsContext $ctx, array $options): void {}
    public function PostConstruct(StarWarsContext $ctx): void {}
    public function PostConstructEntity(StarWarsContext $ctx): void {}
    public function SetData(StarWarsContext $ctx): void {}
    public function GetData(StarWarsContext $ctx): void {}
    public function GetMatch(StarWarsContext $ctx): void {}
    public function SetMatch(StarWarsContext $ctx): void {}
    public function PrePoint(StarWarsContext $ctx): void {}
    public function PreSpec(StarWarsContext $ctx): void {}
    public function PreRequest(StarWarsContext $ctx): void {}
    public function PreResponse(StarWarsContext $ctx): void {}
    public function PreResult(StarWarsContext $ctx): void {}
    public function PreDone(StarWarsContext $ctx): void {}
    public function PreUnexpected(StarWarsContext $ctx): void {}
}
