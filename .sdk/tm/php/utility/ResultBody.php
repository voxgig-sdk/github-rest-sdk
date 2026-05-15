<?php
declare(strict_types=1);

// GithubRest SDK utility: result_body

class GithubRestResultBody
{
    public static function call(GithubRestContext $ctx): ?GithubRestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
