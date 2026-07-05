<?php
declare(strict_types=1);

// Typed models for the GithubRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Branch entity data model. */
class Branch
{
    public ?array $commit = null;
    public ?string $name = null;
    public ?bool $protected = null;
}

/** Request payload for Branch#list. */
class BranchListMatch
{
    public string $owner;
    public string $repo;
}

/** Commit entity data model. */
class Commit
{
    public ?array $author = null;
    public ?array $commit = null;
    public ?array $committer = null;
    public ?string $html_url = null;
    public ?string $node_id = null;
    public ?string $sha = null;
    public ?string $url = null;
}

/** Request payload for Commit#list. */
class CommitListMatch
{
    public string $owner;
    public string $repo;
}

/** Gist entity data model. */
class Gist
{
    public ?string $created_at = null;
    public ?string $description = null;
    public array $file;
    public ?string $html_url = null;
    public ?string $id = null;
    public ?string $node_id = null;
    public ?array $owner = null;
    public ?bool $public = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for Gist#list. */
class GistListMatch
{
    public ?string $created_at = null;
    public ?string $description = null;
    public ?array $file = null;
    public ?string $html_url = null;
    public ?string $id = null;
    public ?string $node_id = null;
    public ?array $owner = null;
    public ?bool $public = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for Gist#create. */
class GistCreateData
{
    public ?string $created_at = null;
    public ?string $description = null;
    public array $file;
    public ?string $html_url = null;
    public ?string $id = null;
    public ?string $node_id = null;
    public ?array $owner = null;
    public ?bool $public = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Issue entity data model. */
class Issue
{
    public mixed $assignee = null;
    public ?string $body = null;
    public ?string $closed_at = null;
    public ?int $comment = null;
    public ?string $created_at = null;
    public ?string $html_url = null;
    public ?int $id = null;
    public ?array $label = null;
    public ?array $milestone = null;
    public ?string $node_id = null;
    public ?int $number = null;
    public ?string $state = null;
    public ?string $title = null;
    public ?string $updated_at = null;
    public ?string $url = null;
    public ?array $user = null;
}

/** Request payload for Issue#load. */
class IssueLoadMatch
{
    public int $id;
    public string $owner;
    public string $repo;
}

/** Request payload for Issue#list. */
class IssueListMatch
{
    public string $owner;
    public string $repo;
}

/** Request payload for Issue#create. */
class IssueCreateData
{
    public string $owner;
    public string $repo;
}

/** Request payload for Issue#update. */
class IssueUpdateData
{
    public int $id;
    public string $owner;
    public string $repo;
}

/** Notification entity data model. */
class Notification
{
    public ?string $id = null;
    public ?string $last_read_at = null;
    public ?string $reason = null;
    public ?array $repository = null;
    public ?array $subject = null;
    public ?bool $unread = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for Notification#list. */
class NotificationListMatch
{
    public ?string $id = null;
    public ?string $last_read_at = null;
    public ?string $reason = null;
    public ?array $repository = null;
    public ?array $subject = null;
    public ?bool $unread = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Org entity data model. */
class Org
{
    public ?string $avatar_url = null;
    public ?string $blog = null;
    public ?string $created_at = null;
    public ?string $description = null;
    public ?string $email = null;
    public ?int $follower = null;
    public ?int $following = null;
    public ?string $html_url = null;
    public ?int $id = null;
    public ?string $location = null;
    public ?string $login = null;
    public ?string $name = null;
    public ?string $node_id = null;
    public ?int $public_gist = null;
    public ?int $public_repo = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for Org#load. */
class OrgLoadMatch
{
    public string $id;
}

/** Pull entity data model. */
class Pull
{
    public ?array $base = null;
    public ?string $body = null;
    public ?string $closed_at = null;
    public ?string $created_at = null;
    public ?bool $draft = null;
    public ?array $head = null;
    public ?string $html_url = null;
    public ?int $id = null;
    public ?string $merged_at = null;
    public ?string $node_id = null;
    public ?int $number = null;
    public ?string $state = null;
    public ?string $title = null;
    public ?string $updated_at = null;
    public ?string $url = null;
    public ?array $user = null;
}

/** Request payload for Pull#load. */
class PullLoadMatch
{
    public int $id;
    public string $owner;
    public string $repo;
}

/** Request payload for Pull#list. */
class PullListMatch
{
    public string $owner;
    public string $repo;
}

/** Request payload for Pull#create. */
class PullCreateData
{
    public string $owner;
    public string $repo;
}

/** RateLimit entity data model. */
class RateLimit
{
    public ?array $rate = null;
    public ?array $resource = null;
}

/** Request payload for RateLimit#load. */
class RateLimitLoadMatch
{
    public ?array $rate = null;
    public ?array $resource = null;
}

/** Repo entity data model. */
class Repo
{
    public ?string $created_at = null;
    public ?string $default_branch = null;
    public ?string $description = null;
    public ?bool $fork = null;
    public ?int $forks_count = null;
    public ?string $full_name = null;
    public ?string $html_url = null;
    public ?int $id = null;
    public ?string $language = null;
    public ?string $name = null;
    public ?string $node_id = null;
    public ?int $open_issues_count = null;
    public ?array $owner = null;
    public ?bool $private = null;
    public ?string $pushed_at = null;
    public ?int $size = null;
    public ?int $stargazers_count = null;
    public ?string $updated_at = null;
    public ?string $url = null;
    public ?string $visibility = null;
    public ?int $watchers_count = null;
}

/** Request payload for Repo#load. */
class RepoLoadMatch
{
    public string $owner;
    public string $repo;
}

/** Request payload for Repo#list. */
class RepoListMatch
{
    public string $username;
    public string $org_id;
}

/** Search entity data model. */
class Search
{
    public mixed $assignee = null;
    public ?string $body = null;
    public ?string $closed_at = null;
    public ?int $comment = null;
    public ?string $created_at = null;
    public ?string $default_branch = null;
    public ?string $description = null;
    public ?bool $fork = null;
    public ?int $forks_count = null;
    public ?string $full_name = null;
    public ?string $html_url = null;
    public ?int $id = null;
    public ?array $label = null;
    public ?string $language = null;
    public ?array $milestone = null;
    public ?string $name = null;
    public ?string $node_id = null;
    public ?int $number = null;
    public ?int $open_issues_count = null;
    public ?array $owner = null;
    public ?bool $private = null;
    public ?string $pushed_at = null;
    public ?int $size = null;
    public ?int $stargazers_count = null;
    public ?string $state = null;
    public ?string $title = null;
    public ?string $updated_at = null;
    public ?string $url = null;
    public ?array $user = null;
    public ?string $visibility = null;
    public ?int $watchers_count = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public mixed $assignee = null;
    public ?string $body = null;
    public ?string $closed_at = null;
    public ?int $comment = null;
    public ?string $created_at = null;
    public ?string $default_branch = null;
    public ?string $description = null;
    public ?bool $fork = null;
    public ?int $forks_count = null;
    public ?string $full_name = null;
    public ?string $html_url = null;
    public ?int $id = null;
    public ?array $label = null;
    public ?string $language = null;
    public ?array $milestone = null;
    public ?string $name = null;
    public ?string $node_id = null;
    public ?int $number = null;
    public ?int $open_issues_count = null;
    public ?array $owner = null;
    public ?bool $private = null;
    public ?string $pushed_at = null;
    public ?int $size = null;
    public ?int $stargazers_count = null;
    public ?string $state = null;
    public ?string $title = null;
    public ?string $updated_at = null;
    public ?string $url = null;
    public ?array $user = null;
    public ?string $visibility = null;
    public ?int $watchers_count = null;
}

/** User entity data model. */
class User
{
    public ?string $avatar_url = null;
    public ?string $bio = null;
    public ?string $blog = null;
    public ?string $company = null;
    public ?string $created_at = null;
    public ?string $email = null;
    public ?int $follower = null;
    public ?int $following = null;
    public ?string $html_url = null;
    public ?int $id = null;
    public ?string $location = null;
    public ?string $login = null;
    public ?string $name = null;
    public ?string $node_id = null;
    public ?int $public_gist = null;
    public ?int $public_repo = null;
    public ?string $type = null;
    public ?string $updated_at = null;
    public ?string $url = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public string $id;
}

