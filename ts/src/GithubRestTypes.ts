// Typed models for the GithubRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Branch {
  commit?: Record<string, any>
  name?: string
  protected?: boolean
}

export interface BranchListMatch {
  owner: string
  repo: string
}

export interface Commit {
  author?: Record<string, any>
  commit?: Record<string, any>
  committer?: Record<string, any>
  html_url?: string
  node_id?: string
  sha?: string
  url?: string
}

export interface CommitListMatch {
  owner: string
  repo: string
}

export interface Gist {
  created_at?: string
  description?: string
  files: Record<string, any>
  html_url?: string
  id?: string
  node_id?: string
  owner?: Record<string, any>
  public?: boolean
  updated_at?: string
  url?: string
}

export interface GistListMatch {
  created_at?: string
  description?: string
  files?: Record<string, any>
  html_url?: string
  id?: string
  node_id?: string
  owner?: Record<string, any>
  public?: boolean
  updated_at?: string
  url?: string
}

export interface GistCreateData {
  created_at?: string
  description?: string
  files: Record<string, any>
  html_url?: string
  id?: string
  node_id?: string
  owner?: Record<string, any>
  public?: boolean
  updated_at?: string
  url?: string
}

export interface Issue {
  assignee?: any
  assignees?: any[]
  body?: string
  closed_at?: string
  comments?: number
  created_at?: string
  html_url?: string
  id?: number
  labels?: any[]
  milestone?: Record<string, any>
  node_id?: string
  number?: number
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user?: Record<string, any>
}

export interface IssueLoadMatch {
  id: number
  owner: string
  repo: string
}

export interface IssueListMatch {
  owner: string
  repo: string
}

export interface IssueCreateData {
  owner: string
  repo: string
  assignee?: any
  assignees?: any[]
  body?: string
  closed_at?: string
  comments?: number
  created_at?: string
  html_url?: string
  id?: number
  labels?: any[]
  milestone?: Record<string, any>
  node_id?: string
  number?: number
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user?: Record<string, any>
}

export interface IssueUpdateData {
  id: number
  owner: string
  repo: string
  assignee?: any
  assignees?: any[]
  body?: string
  closed_at?: string
  comments?: number
  created_at?: string
  html_url?: string
  labels?: any[]
  milestone?: Record<string, any>
  node_id?: string
  number?: number
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user?: Record<string, any>
}

export interface Notification {
  id?: string
  last_read_at?: string
  reason?: string
  repository?: Record<string, any>
  subject?: Record<string, any>
  unread?: boolean
  updated_at?: string
  url?: string
}

export interface NotificationListMatch {
  id?: string
  last_read_at?: string
  reason?: string
  repository?: Record<string, any>
  subject?: Record<string, any>
  unread?: boolean
  updated_at?: string
  url?: string
}

export interface Org {
  avatar_url?: string
  blog?: string
  created_at?: string
  description?: string
  email?: string
  followers?: number
  following?: number
  html_url?: string
  id?: number
  location?: string
  login?: string
  name?: string
  node_id?: string
  public_gists?: number
  public_repos?: number
  updated_at?: string
  url?: string
}

export interface OrgLoadMatch {
  id: string
}

export interface Pull {
  base?: Record<string, any>
  body?: string
  closed_at?: string
  created_at?: string
  draft?: boolean
  head?: Record<string, any>
  html_url?: string
  id?: number
  merged_at?: string
  node_id?: string
  number?: number
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user?: Record<string, any>
}

export interface PullLoadMatch {
  id: number
  owner: string
  repo: string
}

export interface PullListMatch {
  owner: string
  repo: string
}

export interface PullCreateData {
  owner: string
  repo: string
  base?: Record<string, any>
  body?: string
  closed_at?: string
  created_at?: string
  draft?: boolean
  head?: Record<string, any>
  html_url?: string
  id?: number
  merged_at?: string
  node_id?: string
  number?: number
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user?: Record<string, any>
}

export interface RateLimit {
  rate?: Record<string, any>
  resources?: Record<string, any>
}

export interface RateLimitLoadMatch {
  rate?: Record<string, any>
  resources?: Record<string, any>
}

export interface Repo {
  avatar_url?: string
  bio?: string
  blog?: string
  company?: string
  created_at?: string
  default_branch?: string
  description?: string
  email?: string
  followers?: number
  following?: number
  fork?: boolean
  forks_count?: number
  full_name?: string
  html_url?: string
  id?: number
  language?: string
  location?: string
  login?: string
  name?: string
  node_id?: string
  open_issues_count?: number
  owner?: Record<string, any>
  private?: boolean
  public_gists?: number
  public_repos?: number
  pushed_at?: string
  size?: number
  stargazers_count?: number
  type?: string
  updated_at?: string
  url?: string
  visibility?: string
  watchers_count?: number
}

export interface RepoLoadMatch {
  owner: string
  repo: string
}

export interface RepoListMatch {
  username?: string
  org_id?: string
}

export interface Search {
  assignee?: any
  assignees?: any[]
  body?: string
  closed_at?: string
  comments?: number
  created_at?: string
  default_branch?: string
  description?: string
  fork?: boolean
  forks_count?: number
  full_name?: string
  html_url?: string
  id?: number
  labels?: any[]
  language?: string
  milestone?: Record<string, any>
  name?: string
  node_id?: string
  number?: number
  open_issues_count?: number
  owner?: Record<string, any>
  private?: boolean
  pushed_at?: string
  size?: number
  stargazers_count?: number
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user?: Record<string, any>
  visibility?: string
  watchers_count?: number
}

export interface SearchListMatch {
  assignee?: any
  assignees?: any[]
  body?: string
  closed_at?: string
  comments?: number
  created_at?: string
  default_branch?: string
  description?: string
  fork?: boolean
  forks_count?: number
  full_name?: string
  html_url?: string
  id?: number
  labels?: any[]
  language?: string
  milestone?: Record<string, any>
  name?: string
  node_id?: string
  number?: number
  open_issues_count?: number
  owner?: Record<string, any>
  private?: boolean
  pushed_at?: string
  size?: number
  stargazers_count?: number
  state?: string
  title?: string
  updated_at?: string
  url?: string
  user?: Record<string, any>
  visibility?: string
  watchers_count?: number

  // Selects a custom action instead of the plain list:
  //   'issue' | 'repository'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface User {
  avatar_url?: string
  bio?: string
  blog?: string
  company?: string
  created_at?: string
  email?: string
  followers?: number
  following?: number
  html_url?: string
  id?: number
  location?: string
  login?: string
  name?: string
  node_id?: string
  public_gists?: number
  public_repos?: number
  type?: string
  updated_at?: string
  url?: string
}

export interface UserLoadMatch {
  id?: string
}

