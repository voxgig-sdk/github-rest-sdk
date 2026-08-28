# frozen_string_literal: true

# Typed models for the GithubRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Branch entity data model.
#
# @!attribute [rw] commit
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] protected
#   @return [Boolean, nil]
Branch = Struct.new(
  :commit,
  :name,
  :protected,
  keyword_init: true
)

# Request payload for Branch#list.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
BranchListMatch = Struct.new(
  :owner,
  :repo,
  :page,
  :per_page,
  keyword_init: true
)

# Commit entity data model.
#
# @!attribute [rw] author
#   @return [Hash, nil]
#
# @!attribute [rw] commit
#   @return [Hash, nil]
#
# @!attribute [rw] committer
#   @return [Hash, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] sha
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Commit = Struct.new(
  :author,
  :commit,
  :committer,
  :html_url,
  :node_id,
  :sha,
  :url,
  keyword_init: true
)

# Request payload for Commit#list.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] path
#   @return [String, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sha
#   @return [String, nil]
CommitListMatch = Struct.new(
  :owner,
  :repo,
  :page,
  :path,
  :per_page,
  :sha,
  keyword_init: true
)

# Gist entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] files
#   @return [Hash]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] public
#   @return [Boolean, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Gist = Struct.new(
  :created_at,
  :description,
  :files,
  :html_url,
  :id,
  :node_id,
  :owner,
  :public,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Gist#list.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
GistListMatch = Struct.new(
  :page,
  :per_page,
  keyword_init: true
)

# Request payload for Gist#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] files
#   @return [Hash]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] public
#   @return [Boolean, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
GistCreateData = Struct.new(
  :created_at,
  :description,
  :files,
  :html_url,
  :id,
  :node_id,
  :owner,
  :public,
  :updated_at,
  :url,
  keyword_init: true
)

# Issue entity data model.
#
# @!attribute [rw] assignee
#   @return [Object, nil]
#
# @!attribute [rw] assignees
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] milestone
#   @return [Hash, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
Issue = Struct.new(
  :assignee,
  :assignees,
  :body,
  :closed_at,
  :comments,
  :created_at,
  :html_url,
  :id,
  :labels,
  :milestone,
  :node_id,
  :number,
  :state,
  :title,
  :updated_at,
  :url,
  :user,
  keyword_init: true
)

# Request payload for Issue#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
IssueLoadMatch = Struct.new(
  :id,
  :owner,
  :repo,
  keyword_init: true
)

# Request payload for Issue#list.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] label
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
IssueListMatch = Struct.new(
  :owner,
  :repo,
  :direction,
  :label,
  :page,
  :per_page,
  :sort,
  :state,
  keyword_init: true
)

# Request payload for Issue#create.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] assignee
#   @return [Object, nil]
#
# @!attribute [rw] assignees
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] milestone
#   @return [Hash, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
IssueCreateData = Struct.new(
  :owner,
  :repo,
  :assignee,
  :assignees,
  :body,
  :closed_at,
  :comments,
  :created_at,
  :html_url,
  :id,
  :labels,
  :milestone,
  :node_id,
  :number,
  :state,
  :title,
  :updated_at,
  :url,
  :user,
  keyword_init: true
)

# Request payload for Issue#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] assignee
#   @return [Object, nil]
#
# @!attribute [rw] assignees
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] milestone
#   @return [Hash, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
IssueUpdateData = Struct.new(
  :id,
  :owner,
  :repo,
  :assignee,
  :assignees,
  :body,
  :closed_at,
  :comments,
  :created_at,
  :html_url,
  :labels,
  :milestone,
  :node_id,
  :number,
  :state,
  :title,
  :updated_at,
  :url,
  :user,
  keyword_init: true
)

# Notification entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] last_read_at
#   @return [String, nil]
#
# @!attribute [rw] reason
#   @return [String, nil]
#
# @!attribute [rw] repository
#   @return [Hash, nil]
#
# @!attribute [rw] subject
#   @return [Hash, nil]
#
# @!attribute [rw] unread
#   @return [Boolean, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Notification = Struct.new(
  :id,
  :last_read_at,
  :reason,
  :repository,
  :subject,
  :unread,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Notification#list.
#
# @!attribute [rw] all
#   @return [Boolean, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] participating
#   @return [Boolean, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
NotificationListMatch = Struct.new(
  :all,
  :page,
  :participating,
  :per_page,
  keyword_init: true
)

# Org entity data model.
#
# @!attribute [rw] avatar_url
#   @return [String, nil]
#
# @!attribute [rw] blog
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] followers
#   @return [Integer, nil]
#
# @!attribute [rw] following
#   @return [Integer, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] login
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] public_gists
#   @return [Integer, nil]
#
# @!attribute [rw] public_repos
#   @return [Integer, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Org = Struct.new(
  :avatar_url,
  :blog,
  :created_at,
  :description,
  :email,
  :followers,
  :following,
  :html_url,
  :id,
  :location,
  :login,
  :name,
  :node_id,
  :public_gists,
  :public_repos,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for Org#load.
#
# @!attribute [rw] id
#   @return [String]
OrgLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Pull entity data model.
#
# @!attribute [rw] base
#   @return [Hash, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] draft
#   @return [Boolean, nil]
#
# @!attribute [rw] head
#   @return [Hash, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] merged_at
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
Pull = Struct.new(
  :base,
  :body,
  :closed_at,
  :created_at,
  :draft,
  :head,
  :html_url,
  :id,
  :merged_at,
  :node_id,
  :number,
  :state,
  :title,
  :updated_at,
  :url,
  :user,
  keyword_init: true
)

# Request payload for Pull#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
PullLoadMatch = Struct.new(
  :id,
  :owner,
  :repo,
  keyword_init: true
)

# Request payload for Pull#list.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
PullListMatch = Struct.new(
  :owner,
  :repo,
  :direction,
  :page,
  :per_page,
  :sort,
  :state,
  keyword_init: true
)

# Request payload for Pull#create.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
#
# @!attribute [rw] base
#   @return [Hash, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] draft
#   @return [Boolean, nil]
#
# @!attribute [rw] head
#   @return [Hash, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] merged_at
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
PullCreateData = Struct.new(
  :owner,
  :repo,
  :base,
  :body,
  :closed_at,
  :created_at,
  :draft,
  :head,
  :html_url,
  :id,
  :merged_at,
  :node_id,
  :number,
  :state,
  :title,
  :updated_at,
  :url,
  :user,
  keyword_init: true
)

# RateLimit entity data model.
#
# @!attribute [rw] rate
#   @return [Hash, nil]
#
# @!attribute [rw] resources
#   @return [Hash, nil]
RateLimit = Struct.new(
  :rate,
  :resources,
  keyword_init: true
)

# Request payload for RateLimit#load.
#
# @!attribute [rw] rate
#   @return [Hash, nil]
#
# @!attribute [rw] resources
#   @return [Hash, nil]
RateLimitLoadMatch = Struct.new(
  :rate,
  :resources,
  keyword_init: true
)

# Repo entity data model.
#
# @!attribute [rw] avatar_url
#   @return [String, nil]
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] blog
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] default_branch
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] followers
#   @return [Integer, nil]
#
# @!attribute [rw] following
#   @return [Integer, nil]
#
# @!attribute [rw] fork
#   @return [Boolean, nil]
#
# @!attribute [rw] forks_count
#   @return [Integer, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] login
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] open_issues_count
#   @return [Integer, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] private
#   @return [Boolean, nil]
#
# @!attribute [rw] public_gists
#   @return [Integer, nil]
#
# @!attribute [rw] public_repos
#   @return [Integer, nil]
#
# @!attribute [rw] pushed_at
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] stargazers_count
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
#
# @!attribute [rw] watchers_count
#   @return [Integer, nil]
Repo = Struct.new(
  :avatar_url,
  :bio,
  :blog,
  :company,
  :created_at,
  :default_branch,
  :description,
  :email,
  :followers,
  :following,
  :fork,
  :forks_count,
  :full_name,
  :html_url,
  :id,
  :language,
  :location,
  :login,
  :name,
  :node_id,
  :open_issues_count,
  :owner,
  :private,
  :public_gists,
  :public_repos,
  :pushed_at,
  :size,
  :stargazers_count,
  :type,
  :updated_at,
  :url,
  :visibility,
  :watchers_count,
  keyword_init: true
)

# Request payload for Repo#load.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
RepoLoadMatch = Struct.new(
  :owner,
  :repo,
  keyword_init: true
)

# Request payload for Repo#list.
#
# @!attribute [rw] username
#   @return [String]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] sort
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
RepoListMatch = Struct.new(
  :username,
  :direction,
  :page,
  :per_page,
  :sort,
  :type,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] assignee
#   @return [Object, nil]
#
# @!attribute [rw] assignees
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] comments
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] default_branch
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] fork
#   @return [Boolean, nil]
#
# @!attribute [rw] forks_count
#   @return [Integer, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] labels
#   @return [Array, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] milestone
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] open_issues_count
#   @return [Integer, nil]
#
# @!attribute [rw] owner
#   @return [Hash, nil]
#
# @!attribute [rw] private
#   @return [Boolean, nil]
#
# @!attribute [rw] pushed_at
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] stargazers_count
#   @return [Integer, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
#
# @!attribute [rw] visibility
#   @return [String, nil]
#
# @!attribute [rw] watchers_count
#   @return [Integer, nil]
Search = Struct.new(
  :assignee,
  :assignees,
  :body,
  :closed_at,
  :comments,
  :created_at,
  :default_branch,
  :description,
  :fork,
  :forks_count,
  :full_name,
  :html_url,
  :id,
  :labels,
  :language,
  :milestone,
  :name,
  :node_id,
  :number,
  :open_issues_count,
  :owner,
  :private,
  :pushed_at,
  :size,
  :stargazers_count,
  :state,
  :title,
  :updated_at,
  :url,
  :user,
  :visibility,
  :watchers_count,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] per_page
#   @return [Integer, nil]
#
# @!attribute [rw] q
#   @return [String]
#
# @!attribute [rw] sort
#   @return [String, nil]
SearchListMatch = Struct.new(
  :order,
  :page,
  :per_page,
  :q,
  :sort,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] avatar_url
#   @return [String, nil]
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] blog
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] followers
#   @return [Integer, nil]
#
# @!attribute [rw] following
#   @return [Integer, nil]
#
# @!attribute [rw] html_url
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] login
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] node_id
#   @return [String, nil]
#
# @!attribute [rw] public_gists
#   @return [Integer, nil]
#
# @!attribute [rw] public_repos
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
User = Struct.new(
  :avatar_url,
  :bio,
  :blog,
  :company,
  :created_at,
  :email,
  :followers,
  :following,
  :html_url,
  :id,
  :location,
  :login,
  :name,
  :node_id,
  :public_gists,
  :public_repos,
  :type,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] id
#   @return [String]
UserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

