<?php
declare(strict_types=1);

// StarWars SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class StarWarsMakeContext
{
    public static function call(array $ctxmap, ?StarWarsContext $basectx): StarWarsContext
    {
        return new StarWarsContext($ctxmap, $basectx);
    }
}
