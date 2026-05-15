<?php
declare(strict_types=1);

// GithubRest SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GithubRestMakeContext
{
    public static function call(array $ctxmap, ?GithubRestContext $basectx): GithubRestContext
    {
        return new GithubRestContext($ctxmap, $basectx);
    }
}
