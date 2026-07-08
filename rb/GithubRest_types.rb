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
BranchListMatch = Struct.new(
  :owner,
  :repo,
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
CommitListMatch = Struct.new(
  :owner,
  :repo,
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
# @!attribute [rw] file
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
  :file,
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
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] file
#   @return [Hash, nil]
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
GistListMatch = Struct.new(
  :created_at,
  :description,
  :file,
  :html_url,
  :id,
  :node_id,
  :owner,
  :public,
  :updated_at,
  :url,
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
# @!attribute [rw] file
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
  :file,
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
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] comment
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
# @!attribute [rw] label
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
  :body,
  :closed_at,
  :comment,
  :created_at,
  :html_url,
  :id,
  :label,
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
IssueListMatch = Struct.new(
  :owner,
  :repo,
  keyword_init: true
)

# Request payload for Issue#create.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
IssueCreateData = Struct.new(
  :owner,
  :repo,
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
IssueUpdateData = Struct.new(
  :id,
  :owner,
  :repo,
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
NotificationListMatch = Struct.new(
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
# @!attribute [rw] follower
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
# @!attribute [rw] public_gist
#   @return [Integer, nil]
#
# @!attribute [rw] public_repo
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
  :follower,
  :following,
  :html_url,
  :id,
  :location,
  :login,
  :name,
  :node_id,
  :public_gist,
  :public_repo,
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
PullListMatch = Struct.new(
  :owner,
  :repo,
  keyword_init: true
)

# Request payload for Pull#create.
#
# @!attribute [rw] owner
#   @return [String]
#
# @!attribute [rw] repo
#   @return [String]
PullCreateData = Struct.new(
  :owner,
  :repo,
  keyword_init: true
)

# RateLimit entity data model.
#
# @!attribute [rw] rate
#   @return [Hash, nil]
#
# @!attribute [rw] resource
#   @return [Hash, nil]
RateLimit = Struct.new(
  :rate,
  :resource,
  keyword_init: true
)

# Request payload for RateLimit#load.
#
# @!attribute [rw] rate
#   @return [Hash, nil]
#
# @!attribute [rw] resource
#   @return [Hash, nil]
RateLimitLoadMatch = Struct.new(
  :rate,
  :resource,
  keyword_init: true
)

# Repo entity data model.
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
# @!attribute [rw] language
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
# @!attribute [rw] pushed_at
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] stargazers_count
#   @return [Integer, nil]
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
  :created_at,
  :default_branch,
  :description,
  :fork,
  :forks_count,
  :full_name,
  :html_url,
  :id,
  :language,
  :name,
  :node_id,
  :open_issues_count,
  :owner,
  :private,
  :pushed_at,
  :size,
  :stargazers_count,
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
#   @return [String, nil]
#
# @!attribute [rw] org_id
#   @return [String, nil]
RepoListMatch = Struct.new(
  :username,
  :org_id,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] assignee
#   @return [Object, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] comment
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
# @!attribute [rw] label
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
  :body,
  :closed_at,
  :comment,
  :created_at,
  :default_branch,
  :description,
  :fork,
  :forks_count,
  :full_name,
  :html_url,
  :id,
  :label,
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
# @!attribute [rw] assignee
#   @return [Object, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] closed_at
#   @return [String, nil]
#
# @!attribute [rw] comment
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
# @!attribute [rw] label
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
SearchListMatch = Struct.new(
  :assignee,
  :body,
  :closed_at,
  :comment,
  :created_at,
  :default_branch,
  :description,
  :fork,
  :forks_count,
  :full_name,
  :html_url,
  :id,
  :label,
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
# @!attribute [rw] follower
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
# @!attribute [rw] public_gist
#   @return [Integer, nil]
#
# @!attribute [rw] public_repo
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
  :follower,
  :following,
  :html_url,
  :id,
  :location,
  :login,
  :name,
  :node_id,
  :public_gist,
  :public_repo,
  :type,
  :updated_at,
  :url,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] id
#   @return [String, nil]
UserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

