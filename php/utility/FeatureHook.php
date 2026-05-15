<?php
declare(strict_types=1);

// GithubRest SDK utility: feature_hook

class GithubRestFeatureHook
{
    public static function call(GithubRestContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
