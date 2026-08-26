# GithubRest SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "GithubRest",
            "slug": "github-rest",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.github.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "branch": {},
                "commit": {},
                "gist": {},
                "issue": {},
                "notification": {},
                "org": {},
                "pull": {},
                "rate_limit": {},
                "repo": {},
                "search": {},
                "user": {},
            },
        },
        "entity": {
      "branch": {
        "fields": [
          {
            "name": "commit",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "protected",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "branch",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/repos/{owner}/{repo}/branches",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "branches",
                ],
                "select": {
                  "exist": [
                    "owner",
                    "page",
                    "per_page",
                    "repo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "repo",
            ],
          ],
        },
      },
      "commit": {
        "fields": [
          {
            "name": "author",
            "type": "`$OBJECT`",
          },
          {
            "name": "commit",
            "type": "`$OBJECT`",
          },
          {
            "name": "committer",
            "type": "`$OBJECT`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "sha",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "commit",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "path",
                      "orig": "path",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "sha",
                      "orig": "sha",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/repos/{owner}/{repo}/commits",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "commits",
                ],
                "select": {
                  "exist": [
                    "owner",
                    "page",
                    "path",
                    "per_page",
                    "repo",
                    "sha",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "repo",
            ],
          ],
        },
      },
      "gist": {
        "fields": [
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Description of the gist",
            "type": "`$STRING`",
          },
          {
            "name": "files",
            "op": {
              "list": {
                "type": "`$OBJECT`",
              },
            },
            "req": True,
            "short": "Names and content for the files that make up the gist",
            "type": "`$OBJECT`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "type": "`$OBJECT`",
          },
          {
            "name": "public",
            "short": "Whether the gist is public",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "gist",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/gists",
                "parts": [
                  "gists",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/gists",
                "parts": [
                  "gists",
                ],
                "select": {
                  "exist": [
                    "page",
                    "per_page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "issue": {
        "fields": [
          {
            "name": "assignee",
            "type": "`$ANY`",
          },
          {
            "name": "assignees",
            "short": "Logins for Users to assign to this issue",
            "type": "`$ARRAY`",
          },
          {
            "name": "body",
            "short": "The contents of the issue",
            "type": "`$STRING`",
          },
          {
            "name": "closed_at",
            "type": "`$STRING`",
          },
          {
            "name": "comments",
            "type": "`$INTEGER`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "labels",
            "short": "Labels to associate with this issue",
            "type": "`$ARRAY`",
          },
          {
            "name": "milestone",
            "short": "The number of the milestone to associate this issue with",
            "type": "`$OBJECT`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "number",
            "short": "The issue number",
            "type": "`$INTEGER`",
          },
          {
            "name": "state",
            "short": "State of the issue",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The issue title",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "user",
            "type": "`$OBJECT`",
          },
        ],
        "name": "issue",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/repos/{owner}/{repo}/issues",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                ],
                "select": {
                  "exist": [
                    "owner",
                    "repo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "direction",
                      "orig": "direction",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "label",
                      "orig": "label",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "created",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "open",
                      "kind": "query",
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/repos/{owner}/{repo}/issues",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                ],
                "select": {
                  "exist": [
                    "direction",
                    "label",
                    "owner",
                    "page",
                    "per_page",
                    "repo",
                    "sort",
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "issue_number",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/repos/{owner}/{repo}/issues/{issue_number}",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "issue_number": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "owner",
                    "repo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "issue_number",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/repos/{owner}/{repo}/issues/{issue_number}",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "issue_number": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "owner",
                    "repo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "repo",
            ],
          ],
        },
      },
      "notification": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "last_read_at",
            "type": "`$STRING`",
          },
          {
            "name": "reason",
            "type": "`$STRING`",
          },
          {
            "name": "repository",
            "type": "`$OBJECT`",
          },
          {
            "name": "subject",
            "type": "`$OBJECT`",
          },
          {
            "name": "unread",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "notification",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "all",
                      "orig": "all",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "participating",
                      "orig": "participating",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/notifications",
                "parts": [
                  "notifications",
                ],
                "select": {
                  "exist": [
                    "all",
                    "page",
                    "participating",
                    "per_page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "org": {
        "fields": [
          {
            "name": "avatar_url",
            "type": "`$STRING`",
          },
          {
            "name": "blog",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "followers",
            "type": "`$INTEGER`",
          },
          {
            "name": "following",
            "type": "`$INTEGER`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "login",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "public_gists",
            "type": "`$INTEGER`",
          },
          {
            "name": "public_repos",
            "type": "`$INTEGER`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "org",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "org",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/orgs/{org}",
                "parts": [
                  "orgs",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "org": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "pull": {
        "fields": [
          {
            "name": "base",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The name of the branch you want the changes pulled into",
            "type": "`$OBJECT`",
          },
          {
            "name": "body",
            "short": "The contents of the pull request",
            "type": "`$STRING`",
          },
          {
            "name": "closed_at",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "draft",
            "short": "Indicates whether the pull request is a draft",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "head",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The name of the branch where your changes are implemented",
            "type": "`$OBJECT`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "merged_at",
            "type": "`$STRING`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "number",
            "type": "`$INTEGER`",
          },
          {
            "name": "state",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "The title of the pull request",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "user",
            "type": "`$OBJECT`",
          },
        ],
        "name": "pull",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/repos/{owner}/{repo}/pulls",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                ],
                "select": {
                  "exist": [
                    "owner",
                    "repo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "direction",
                      "orig": "direction",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "created",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "open",
                      "kind": "query",
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/repos/{owner}/{repo}/pulls",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                ],
                "select": {
                  "exist": [
                    "direction",
                    "owner",
                    "page",
                    "per_page",
                    "repo",
                    "sort",
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "pull_number",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/repos/{owner}/{repo}/pulls/{pull_number}",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "pull_number": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "owner",
                    "repo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "repo",
            ],
          ],
        },
      },
      "rate_limit": {
        "fields": [
          {
            "name": "rate",
            "type": "`$OBJECT`",
          },
          {
            "name": "resources",
            "type": "`$OBJECT`",
          },
        ],
        "name": "rate_limit",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/rate_limit",
                "parts": [
                  "rate_limit",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "repo": {
        "fields": [
          {
            "name": "avatar_url",
            "short": "URL to the user's avatar image",
            "type": "`$STRING`",
          },
          {
            "name": "bio",
            "type": "`$STRING`",
          },
          {
            "name": "blog",
            "type": "`$STRING`",
          },
          {
            "name": "company",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "default_branch",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "followers",
            "type": "`$INTEGER`",
          },
          {
            "name": "following",
            "type": "`$INTEGER`",
          },
          {
            "name": "fork",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "forks_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "full_name",
            "short": "The full name including owner",
            "type": "`$STRING`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The user's unique identifier",
            "type": "`$INTEGER`",
          },
          {
            "name": "language",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "login",
            "short": "The user's GitHub username",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "The name of the repository",
            "type": "`$STRING`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "open_issues_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "owner",
            "type": "`$OBJECT`",
          },
          {
            "name": "private",
            "short": "Whether the repository is private",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "public_gists",
            "type": "`$INTEGER`",
          },
          {
            "name": "public_repos",
            "type": "`$INTEGER`",
          },
          {
            "name": "pushed_at",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "type": "`$INTEGER`",
          },
          {
            "name": "stargazers_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "visibility",
            "type": "`$STRING`",
          },
          {
            "name": "watchers_count",
            "type": "`$INTEGER`",
          },
        ],
        "name": "repo",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "asc",
                      "kind": "query",
                      "name": "direction",
                      "orig": "direction",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "full_name",
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "owner",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/users/{username}/repos",
                "parts": [
                  "users",
                  "{username}",
                  "repos",
                ],
                "select": {
                  "exist": [
                    "direction",
                    "page",
                    "per_page",
                    "sort",
                    "type",
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "org_id",
                      "orig": "org",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "all",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/orgs/{org}/repos",
                "parts": [
                  "orgs",
                  "{org_id}",
                  "repos",
                ],
                "rename": {
                  "param": {
                    "org": "org_id",
                  },
                },
                "select": {
                  "exist": [
                    "org_id",
                    "page",
                    "per_page",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "owner",
                      "orig": "owner",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "repo",
                      "orig": "repo",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/repos/{owner}/{repo}",
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                ],
                "select": {
                  "exist": [
                    "owner",
                    "repo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.owner`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "org",
            ],
            [
              "repo",
            ],
            [
              "user",
            ],
          ],
        },
      },
      "search": {
        "fields": [
          {
            "name": "assignee",
            "type": "`$ANY`",
          },
          {
            "name": "assignees",
            "type": "`$ARRAY`",
          },
          {
            "name": "body",
            "type": "`$STRING`",
          },
          {
            "name": "closed_at",
            "type": "`$STRING`",
          },
          {
            "name": "comments",
            "type": "`$INTEGER`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "default_branch",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "fork",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "forks_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "full_name",
            "short": "The full name including owner",
            "type": "`$STRING`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "labels",
            "type": "`$ARRAY`",
          },
          {
            "name": "language",
            "type": "`$STRING`",
          },
          {
            "name": "milestone",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "short": "The name of the repository",
            "type": "`$STRING`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "number",
            "short": "The issue number",
            "type": "`$INTEGER`",
          },
          {
            "name": "open_issues_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "owner",
            "type": "`$OBJECT`",
          },
          {
            "name": "private",
            "short": "Whether the repository is private",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "pushed_at",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "type": "`$INTEGER`",
          },
          {
            "name": "stargazers_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "state",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "The issue title",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "user",
            "type": "`$OBJECT`",
          },
          {
            "name": "visibility",
            "type": "`$STRING`",
          },
          {
            "name": "watchers_count",
            "type": "`$INTEGER`",
          },
        ],
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search/issues",
                "parts": [
                  "search",
                  "issues",
                ],
                "select": {
                  "$action": "issue",
                  "exist": [
                    "order",
                    "page",
                    "per_page",
                    "q",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "example": "desc",
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 30,
                      "kind": "query",
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "sort",
                      "orig": "sort",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search/repositories",
                "parts": [
                  "search",
                  "repositories",
                ],
                "select": {
                  "$action": "repository",
                  "exist": [
                    "order",
                    "page",
                    "per_page",
                    "q",
                    "sort",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "name": "avatar_url",
            "short": "URL to the user's avatar image",
            "type": "`$STRING`",
          },
          {
            "name": "bio",
            "type": "`$STRING`",
          },
          {
            "name": "blog",
            "type": "`$STRING`",
          },
          {
            "name": "company",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "followers",
            "type": "`$INTEGER`",
          },
          {
            "name": "following",
            "type": "`$INTEGER`",
          },
          {
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The user's unique identifier",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "login",
            "short": "The user's GitHub username",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "node_id",
            "type": "`$STRING`",
          },
          {
            "name": "public_gists",
            "type": "`$INTEGER`",
          },
          {
            "name": "public_repos",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "user",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/users/{username}",
                "parts": [
                  "users",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "username": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/user",
                "parts": [
                  "user",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
