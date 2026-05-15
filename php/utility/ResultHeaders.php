<?php
declare(strict_types=1);

// GithubRest SDK utility: result_headers

class GithubRestResultHeaders
{
    public static function call(GithubRestContext $ctx): ?GithubRestResult
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
