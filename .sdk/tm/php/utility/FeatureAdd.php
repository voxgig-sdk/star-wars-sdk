<?php
declare(strict_types=1);

// StarWars SDK utility: feature_add

class StarWarsFeatureAdd
{
    public static function call(StarWarsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
