<?php
declare(strict_types=1);

// StarWars SDK utility: prepare_body

class StarWarsPrepareBody
{
    public static function call(StarWarsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
