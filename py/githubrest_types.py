# Typed models for the GithubRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Branch(TypedDict, total=False):
    commit: dict
    name: str
    protected: bool


class BranchListMatch(TypedDict):
    owner: str
    repo: str


class Commit(TypedDict, total=False):
    author: dict
    commit: dict
    committer: dict
    html_url: str
    node_id: str
    sha: str
    url: str


class CommitListMatch(TypedDict):
    owner: str
    repo: str


class GistRequired(TypedDict):
    file: dict


class Gist(GistRequired, total=False):
    created_at: str
    description: str
    html_url: str
    id: str
    node_id: str
    owner: dict
    public: bool
    updated_at: str
    url: str


class GistListMatch(TypedDict, total=False):
    created_at: str
    description: str
    file: dict
    html_url: str
    id: str
    node_id: str
    owner: dict
    public: bool
    updated_at: str
    url: str


class GistCreateDataRequired(TypedDict):
    file: dict


class GistCreateData(GistCreateDataRequired, total=False):
    created_at: str
    description: str
    html_url: str
    id: str
    node_id: str
    owner: dict
    public: bool
    updated_at: str
    url: str


class Issue(TypedDict, total=False):
    assignee: Any
    body: str
    closed_at: str
    comment: int
    created_at: str
    html_url: str
    id: int
    label: list
    milestone: dict
    node_id: str
    number: int
    state: str
    title: str
    updated_at: str
    url: str
    user: dict


class IssueLoadMatch(TypedDict):
    id: int
    owner: str
    repo: str


class IssueListMatch(TypedDict):
    owner: str
    repo: str


class IssueCreateData(TypedDict):
    owner: str
    repo: str


class IssueUpdateData(TypedDict):
    id: int
    owner: str
    repo: str


class Notification(TypedDict, total=False):
    id: str
    last_read_at: str
    reason: str
    repository: dict
    subject: dict
    unread: bool
    updated_at: str
    url: str


class NotificationListMatch(TypedDict, total=False):
    id: str
    last_read_at: str
    reason: str
    repository: dict
    subject: dict
    unread: bool
    updated_at: str
    url: str


class Org(TypedDict, total=False):
    avatar_url: str
    blog: str
    created_at: str
    description: str
    email: str
    follower: int
    following: int
    html_url: str
    id: int
    location: str
    login: str
    name: str
    node_id: str
    public_gist: int
    public_repo: int
    updated_at: str
    url: str


class OrgLoadMatch(TypedDict):
    id: str


class Pull(TypedDict, total=False):
    base: dict
    body: str
    closed_at: str
    created_at: str
    draft: bool
    head: dict
    html_url: str
    id: int
    merged_at: str
    node_id: str
    number: int
    state: str
    title: str
    updated_at: str
    url: str
    user: dict


class PullLoadMatch(TypedDict):
    id: int
    owner: str
    repo: str


class PullListMatch(TypedDict):
    owner: str
    repo: str


class PullCreateData(TypedDict):
    owner: str
    repo: str


class RateLimit(TypedDict, total=False):
    rate: dict
    resource: dict


class RateLimitLoadMatch(TypedDict, total=False):
    rate: dict
    resource: dict


class Repo(TypedDict, total=False):
    created_at: str
    default_branch: str
    description: str
    fork: bool
    forks_count: int
    full_name: str
    html_url: str
    id: int
    language: str
    name: str
    node_id: str
    open_issues_count: int
    owner: dict
    private: bool
    pushed_at: str
    size: int
    stargazers_count: int
    updated_at: str
    url: str
    visibility: str
    watchers_count: int


class RepoLoadMatch(TypedDict):
    owner: str
    repo: str


class RepoListMatch(TypedDict, total=False):
    username: str
    org_id: str


class Search(TypedDict, total=False):
    assignee: Any
    body: str
    closed_at: str
    comment: int
    created_at: str
    default_branch: str
    description: str
    fork: bool
    forks_count: int
    full_name: str
    html_url: str
    id: int
    label: list
    language: str
    milestone: dict
    name: str
    node_id: str
    number: int
    open_issues_count: int
    owner: dict
    private: bool
    pushed_at: str
    size: int
    stargazers_count: int
    state: str
    title: str
    updated_at: str
    url: str
    user: dict
    visibility: str
    watchers_count: int


class SearchListMatch(TypedDict, total=False):
    assignee: Any
    body: str
    closed_at: str
    comment: int
    created_at: str
    default_branch: str
    description: str
    fork: bool
    forks_count: int
    full_name: str
    html_url: str
    id: int
    label: list
    language: str
    milestone: dict
    name: str
    node_id: str
    number: int
    open_issues_count: int
    owner: dict
    private: bool
    pushed_at: str
    size: int
    stargazers_count: int
    state: str
    title: str
    updated_at: str
    url: str
    user: dict
    visibility: str
    watchers_count: int


class User(TypedDict, total=False):
    avatar_url: str
    bio: str
    blog: str
    company: str
    created_at: str
    email: str
    follower: int
    following: int
    html_url: str
    id: int
    location: str
    login: str
    name: str
    node_id: str
    public_gist: int
    public_repo: int
    type: str
    updated_at: str
    url: str


class UserLoadMatch(TypedDict, total=False):
    id: str
