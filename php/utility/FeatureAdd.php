<?php
declare(strict_types=1);

// GithubRest SDK utility: feature_add

class GithubRestFeatureAdd
{
    public static function call(GithubRestContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
