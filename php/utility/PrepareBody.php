<?php
declare(strict_types=1);

// GithubRest SDK utility: prepare_body

class GithubRestPrepareBody
{
    public static function call(GithubRestContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
