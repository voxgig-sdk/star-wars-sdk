<?php
declare(strict_types=1);

// StarWars SDK utility: result_headers

class StarWarsResultHeaders
{
    public static function call(StarWarsContext $ctx): ?StarWarsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
