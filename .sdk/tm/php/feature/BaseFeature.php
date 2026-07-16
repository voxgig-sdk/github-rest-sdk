<?php
declare(strict_types=1);

// GithubRest SDK base feature

class GithubRestBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GithubRestContext $ctx, array $options): void {}
    public function PostConstruct(GithubRestContext $ctx): void {}
    public function PostConstructEntity(GithubRestContext $ctx): void {}
    public function SetData(GithubRestContext $ctx): void {}
    public function GetData(GithubRestContext $ctx): void {}
    public function GetMatch(GithubRestContext $ctx): void {}
    public function SetMatch(GithubRestContext $ctx): void {}
    public function PrePoint(GithubRestContext $ctx): void {}
    public function PreSpec(GithubRestContext $ctx): void {}
    public function PreRequest(GithubRestContext $ctx): void {}
    public function PreResponse(GithubRestContext $ctx): void {}
    public function PreResult(GithubRestContext $ctx): void {}
    public function PreDone(GithubRestContext $ctx): void {}
    public function PreUnexpected(GithubRestContext $ctx): void {}
}
