<?php
declare(strict_types=1);

// GithubRest SDK exists test

require_once __DIR__ . '/../githubrest_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GithubRestSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
