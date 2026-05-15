<?php
declare(strict_types=1);

// GithubRest SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GithubRestFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GithubRestBaseFeature();
            case "test":
                return new GithubRestTestFeature();
            default:
                return new GithubRestBaseFeature();
        }
    }
}
