# GithubRest SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "branches",
                  },
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "branches",
                ],
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
            "format": "uri",
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
            "format": "uri",
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
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "commits",
                  },
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "commits",
                ],
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
            "format": "date-time",
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
            "format": "uri",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "gists",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "gists",
                ],
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
                "segments": [
                  {
                    "lit": "gists",
                  },
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
                "parts": [
                  "gists",
                ],
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
            "format": "date-time",
            "name": "closed_at",
            "type": "`$STRING`",
          },
          {
            "name": "comments",
            "type": "`$INTEGER`",
          },
          {
            "format": "date-time",
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "user",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "issues",
                  },
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                ],
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
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "issues",
                  },
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                ],
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
                "rename": {
                  "param": {
                    "issue_number": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "issues",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                  "{id}",
                ],
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
                "rename": {
                  "param": {
                    "issue_number": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "issues",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                  "{id}",
                ],
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
            "format": "date-time",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "notifications",
                  },
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
                "parts": [
                  "notifications",
                ],
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
            "format": "uri",
            "name": "avatar_url",
            "type": "`$STRING`",
          },
          {
            "name": "blog",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "format": "email",
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
            "format": "uri",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "rename": {
                  "param": {
                    "org": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "orgs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "orgs",
                  "{id}",
                ],
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
            "format": "date-time",
            "name": "closed_at",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
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
            "format": "uri",
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "format": "date-time",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "user",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "pulls",
                  },
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                ],
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
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "pulls",
                  },
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                ],
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
                "rename": {
                  "param": {
                    "pull_number": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
                  {
                    "lit": "pulls",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                  "{id}",
                ],
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
                "segments": [
                  {
                    "lit": "rate_limit",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "rate_limit",
                ],
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
            "format": "uri",
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
            "format": "date-time",
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
            "format": "email",
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
            "name": "github-rest_id",
            "short": "The user's unique identifier",
            "type": "`$INTEGER`",
          },
          {
            "format": "uri",
            "name": "html_url",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The user's unique identifier",
            "type": "`$STRING`",
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
            "format": "date-time",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
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
        "id": {
          "field": "id",
          "from": {
            "owner": "owner.login",
            "repo": "name",
          },
          "name": "id",
          "parts": [
            "owner",
            "repo",
          ],
          "sep": "/",
        },
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
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "username",
                  },
                  {
                    "lit": "repos",
                  },
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
                "parts": [
                  "users",
                  "{username}",
                  "repos",
                ],
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
                "rename": {
                  "param": {
                    "org": "org_id",
                  },
                },
                "segments": [
                  {
                    "lit": "orgs",
                  },
                  {
                    "var": "org_id",
                  },
                  {
                    "lit": "repos",
                  },
                ],
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
                "parts": [
                  "orgs",
                  "{org_id}",
                  "repos",
                ],
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
                "segments": [
                  {
                    "lit": "repos",
                  },
                  {
                    "var": "owner",
                  },
                  {
                    "var": "repo",
                  },
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
                "parts": [
                  "repos",
                  "{owner}",
                  "{repo}",
                ],
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
            "format": "date-time",
            "name": "closed_at",
            "type": "`$STRING`",
          },
          {
            "name": "comments",
            "type": "`$INTEGER`",
          },
          {
            "format": "date-time",
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
            "format": "uri",
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
            "format": "date-time",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
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
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "issues",
                  },
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
                "parts": [
                  "search",
                  "issues",
                ],
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
                "segments": [
                  {
                    "lit": "search",
                  },
                  {
                    "lit": "repositories",
                  },
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
                "parts": [
                  "search",
                  "repositories",
                ],
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
            "format": "uri",
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
            "format": "date-time",
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "format": "email",
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
            "format": "uri",
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
            "format": "date-time",
            "name": "updated_at",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "rename": {
                  "param": {
                    "username": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "users",
                  "{id}",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/user",
                "segments": [
                  {
                    "lit": "user",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "user",
                ],
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
