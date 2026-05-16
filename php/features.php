<?php
declare(strict_types=1);

// StarWars SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class StarWarsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new StarWarsBaseFeature();
            case "test":
                return new StarWarsTestFeature();
            default:
                return new StarWarsBaseFeature();
        }
    }
}
