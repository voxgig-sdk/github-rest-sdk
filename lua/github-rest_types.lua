-- Typed models for the GithubRest SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Branch
---@field commit? table
---@field name? string
---@field protected? boolean

---@class BranchListMatch
---@field owner string
---@field repo string

---@class Commit
---@field author? table
---@field commit? table
---@field committer? table
---@field html_url? string
---@field node_id? string
---@field sha? string
---@field url? string

---@class CommitListMatch
---@field owner string
---@field repo string

---@class Gist
---@field created_at? string
---@field description? string
---@field file table
---@field html_url? string
---@field id? string
---@field node_id? string
---@field owner? table
---@field public? boolean
---@field updated_at? string
---@field url? string

---@class GistListMatch

---@class GistCreateData

---@class Issue
---@field assignee? any
---@field body? string
---@field closed_at? string
---@field comment? number
---@field created_at? string
---@field html_url? string
---@field id? number
---@field label? table
---@field milestone? table
---@field node_id? string
---@field number? number
---@field state? string
---@field title? string
---@field updated_at? string
---@field url? string
---@field user? table

---@class IssueLoadMatch
---@field id number
---@field owner string
---@field repo string

---@class IssueListMatch
---@field owner string
---@field repo string

---@class IssueCreateData
---@field owner string
---@field repo string

---@class IssueUpdateData
---@field id number
---@field owner string
---@field repo string

---@class Notification
---@field id? string
---@field last_read_at? string
---@field reason? string
---@field repository? table
---@field subject? table
---@field unread? boolean
---@field updated_at? string
---@field url? string

---@class NotificationListMatch

---@class Org
---@field avatar_url? string
---@field blog? string
---@field created_at? string
---@field description? string
---@field email? string
---@field follower? number
---@field following? number
---@field html_url? string
---@field id? number
---@field location? string
---@field login? string
---@field name? string
---@field node_id? string
---@field public_gist? number
---@field public_repo? number
---@field updated_at? string
---@field url? string

---@class OrgLoadMatch
---@field id string

---@class Pull
---@field base? table
---@field body? string
---@field closed_at? string
---@field created_at? string
---@field draft? boolean
---@field head? table
---@field html_url? string
---@field id? number
---@field merged_at? string
---@field node_id? string
---@field number? number
---@field state? string
---@field title? string
---@field updated_at? string
---@field url? string
---@field user? table

---@class PullLoadMatch
---@field id number
---@field owner string
---@field repo string

---@class PullListMatch
---@field owner string
---@field repo string

---@class PullCreateData
---@field owner string
---@field repo string

---@class RateLimit
---@field rate? table
---@field resource? table

---@class RateLimitLoadMatch

---@class Repo
---@field created_at? string
---@field default_branch? string
---@field description? string
---@field fork? boolean
---@field forks_count? number
---@field full_name? string
---@field html_url? string
---@field id? number
---@field language? string
---@field name? string
---@field node_id? string
---@field open_issues_count? number
---@field owner? table
---@field private? boolean
---@field pushed_at? string
---@field size? number
---@field stargazers_count? number
---@field updated_at? string
---@field url? string
---@field visibility? string
---@field watchers_count? number

---@class RepoLoadMatch
---@field owner string
---@field repo string

---@class RepoListMatch
---@field username string
---@field org_id string

---@class Search
---@field assignee? any
---@field body? string
---@field closed_at? string
---@field comment? number
---@field created_at? string
---@field default_branch? string
---@field description? string
---@field fork? boolean
---@field forks_count? number
---@field full_name? string
---@field html_url? string
---@field id? number
---@field label? table
---@field language? string
---@field milestone? table
---@field name? string
---@field node_id? string
---@field number? number
---@field open_issues_count? number
---@field owner? table
---@field private? boolean
---@field pushed_at? string
---@field size? number
---@field stargazers_count? number
---@field state? string
---@field title? string
---@field updated_at? string
---@field url? string
---@field user? table
---@field visibility? string
---@field watchers_count? number

---@class SearchListMatch

---@class User
---@field avatar_url? string
---@field bio? string
---@field blog? string
---@field company? string
---@field created_at? string
---@field email? string
---@field follower? number
---@field following? number
---@field html_url? string
---@field id? number
---@field location? string
---@field login? string
---@field name? string
---@field node_id? string
---@field public_gist? number
---@field public_repo? number
---@field type? string
---@field updated_at? string
---@field url? string

---@class UserLoadMatch
---@field id string

local M = {}

return M
