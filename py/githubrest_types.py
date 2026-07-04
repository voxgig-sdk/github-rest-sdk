# Typed models for the GithubRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Branch:
    commit: Optional[dict] = None
    name: Optional[str] = None
    protected: Optional[bool] = None


@dataclass
class BranchListMatch:
    owner: str
    repo: str


@dataclass
class Commit:
    author: Optional[dict] = None
    commit: Optional[dict] = None
    committer: Optional[dict] = None
    html_url: Optional[str] = None
    node_id: Optional[str] = None
    sha: Optional[str] = None
    url: Optional[str] = None


@dataclass
class CommitListMatch:
    owner: str
    repo: str


@dataclass
class Gist:
    file: dict
    created_at: Optional[str] = None
    description: Optional[str] = None
    html_url: Optional[str] = None
    id: Optional[str] = None
    node_id: Optional[str] = None
    owner: Optional[dict] = None
    public: Optional[bool] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class GistListMatch:
    created_at: Optional[str] = None
    description: Optional[str] = None
    file: Optional[dict] = None
    html_url: Optional[str] = None
    id: Optional[str] = None
    node_id: Optional[str] = None
    owner: Optional[dict] = None
    public: Optional[bool] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class GistCreateData:
    created_at: Optional[str] = None
    description: Optional[str] = None
    file: Optional[dict] = None
    html_url: Optional[str] = None
    id: Optional[str] = None
    node_id: Optional[str] = None
    owner: Optional[dict] = None
    public: Optional[bool] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Issue:
    assignee: Optional[Any] = None
    body: Optional[str] = None
    closed_at: Optional[str] = None
    comment: Optional[int] = None
    created_at: Optional[str] = None
    html_url: Optional[str] = None
    id: Optional[int] = None
    label: Optional[list] = None
    milestone: Optional[dict] = None
    node_id: Optional[str] = None
    number: Optional[int] = None
    state: Optional[str] = None
    title: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class IssueLoadMatch:
    id: int
    owner: str
    repo: str


@dataclass
class IssueListMatch:
    owner: str
    repo: str


@dataclass
class IssueCreateData:
    owner: str
    repo: str


@dataclass
class IssueUpdateData:
    id: int
    owner: str
    repo: str


@dataclass
class Notification:
    id: Optional[str] = None
    last_read_at: Optional[str] = None
    reason: Optional[str] = None
    repository: Optional[dict] = None
    subject: Optional[dict] = None
    unread: Optional[bool] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class NotificationListMatch:
    id: Optional[str] = None
    last_read_at: Optional[str] = None
    reason: Optional[str] = None
    repository: Optional[dict] = None
    subject: Optional[dict] = None
    unread: Optional[bool] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Org:
    avatar_url: Optional[str] = None
    blog: Optional[str] = None
    created_at: Optional[str] = None
    description: Optional[str] = None
    email: Optional[str] = None
    follower: Optional[int] = None
    following: Optional[int] = None
    html_url: Optional[str] = None
    id: Optional[int] = None
    location: Optional[str] = None
    login: Optional[str] = None
    name: Optional[str] = None
    node_id: Optional[str] = None
    public_gist: Optional[int] = None
    public_repo: Optional[int] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class OrgLoadMatch:
    id: str


@dataclass
class Pull:
    base: Optional[dict] = None
    body: Optional[str] = None
    closed_at: Optional[str] = None
    created_at: Optional[str] = None
    draft: Optional[bool] = None
    head: Optional[dict] = None
    html_url: Optional[str] = None
    id: Optional[int] = None
    merged_at: Optional[str] = None
    node_id: Optional[str] = None
    number: Optional[int] = None
    state: Optional[str] = None
    title: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None
    user: Optional[dict] = None


@dataclass
class PullLoadMatch:
    id: int
    owner: str
    repo: str


@dataclass
class PullListMatch:
    owner: str
    repo: str


@dataclass
class PullCreateData:
    owner: str
    repo: str


@dataclass
class RateLimit:
    rate: Optional[dict] = None
    resource: Optional[dict] = None


@dataclass
class RateLimitLoadMatch:
    rate: Optional[dict] = None
    resource: Optional[dict] = None


@dataclass
class Repo:
    created_at: Optional[str] = None
    default_branch: Optional[str] = None
    description: Optional[str] = None
    fork: Optional[bool] = None
    forks_count: Optional[int] = None
    full_name: Optional[str] = None
    html_url: Optional[str] = None
    id: Optional[int] = None
    language: Optional[str] = None
    name: Optional[str] = None
    node_id: Optional[str] = None
    open_issues_count: Optional[int] = None
    owner: Optional[dict] = None
    private: Optional[bool] = None
    pushed_at: Optional[str] = None
    size: Optional[int] = None
    stargazers_count: Optional[int] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None
    visibility: Optional[str] = None
    watchers_count: Optional[int] = None


@dataclass
class RepoLoadMatch:
    owner: str
    repo: str


@dataclass
class RepoListMatch:
    username: str
    org_id: str


@dataclass
class Search:
    assignee: Optional[Any] = None
    body: Optional[str] = None
    closed_at: Optional[str] = None
    comment: Optional[int] = None
    created_at: Optional[str] = None
    default_branch: Optional[str] = None
    description: Optional[str] = None
    fork: Optional[bool] = None
    forks_count: Optional[int] = None
    full_name: Optional[str] = None
    html_url: Optional[str] = None
    id: Optional[int] = None
    label: Optional[list] = None
    language: Optional[str] = None
    milestone: Optional[dict] = None
    name: Optional[str] = None
    node_id: Optional[str] = None
    number: Optional[int] = None
    open_issues_count: Optional[int] = None
    owner: Optional[dict] = None
    private: Optional[bool] = None
    pushed_at: Optional[str] = None
    size: Optional[int] = None
    stargazers_count: Optional[int] = None
    state: Optional[str] = None
    title: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None
    user: Optional[dict] = None
    visibility: Optional[str] = None
    watchers_count: Optional[int] = None


@dataclass
class SearchListMatch:
    assignee: Optional[Any] = None
    body: Optional[str] = None
    closed_at: Optional[str] = None
    comment: Optional[int] = None
    created_at: Optional[str] = None
    default_branch: Optional[str] = None
    description: Optional[str] = None
    fork: Optional[bool] = None
    forks_count: Optional[int] = None
    full_name: Optional[str] = None
    html_url: Optional[str] = None
    id: Optional[int] = None
    label: Optional[list] = None
    language: Optional[str] = None
    milestone: Optional[dict] = None
    name: Optional[str] = None
    node_id: Optional[str] = None
    number: Optional[int] = None
    open_issues_count: Optional[int] = None
    owner: Optional[dict] = None
    private: Optional[bool] = None
    pushed_at: Optional[str] = None
    size: Optional[int] = None
    stargazers_count: Optional[int] = None
    state: Optional[str] = None
    title: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None
    user: Optional[dict] = None
    visibility: Optional[str] = None
    watchers_count: Optional[int] = None


@dataclass
class User:
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    blog: Optional[str] = None
    company: Optional[str] = None
    created_at: Optional[str] = None
    email: Optional[str] = None
    follower: Optional[int] = None
    following: Optional[int] = None
    html_url: Optional[str] = None
    id: Optional[int] = None
    location: Optional[str] = None
    login: Optional[str] = None
    name: Optional[str] = None
    node_id: Optional[str] = None
    public_gist: Optional[int] = None
    public_repo: Optional[int] = None
    type: Optional[str] = None
    updated_at: Optional[str] = None
    url: Optional[str] = None


@dataclass
class UserLoadMatch:
    id: str

