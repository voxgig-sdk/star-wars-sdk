<?php
declare(strict_types=1);

// StarWars SDK utility: result_body

class StarWarsResultBody
{
    public static function call(StarWarsContext $ctx): ?StarWarsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
