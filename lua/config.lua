-- GithubRest SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "GithubRest",
      slug = "github-rest",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.github.com",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["branch"] = {},
        ["commit"] = {},
        ["gist"] = {},
        ["issue"] = {},
        ["notification"] = {},
        ["org"] = {},
        ["pull"] = {},
        ["rate_limit"] = {},
        ["repo"] = {},
        ["search"] = {},
        ["user"] = {},
      },
    },
    entity = {
      ["branch"] = {
        ["fields"] = {
          {
            ["name"] = "commit",
            ["title"] = "Commit",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "protected",
            ["title"] = "Protected",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "branch",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/repos/{owner}/{repo}/branches",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "branches",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "branches",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "owner",
                    "page",
                    "per_page",
                    "repo",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.repo",
            },
          },
        },
      },
      ["commit"] = {
        ["fields"] = {
          {
            ["name"] = "author",
            ["title"] = "Author",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "commit",
            ["title"] = "Commit",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "committer",
            ["title"] = "Committer",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "html_url",
            ["title"] = "Html Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "node_id",
            ["title"] = "Node Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "sha",
            ["title"] = "Sha",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
        },
        ["name"] = "commit",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/repos/{owner}/{repo}/commits",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "commits",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "commits",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "path",
                      ["orig"] = "path",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                    {
                      ["name"] = "sha",
                      ["orig"] = "sha",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "owner",
                    "page",
                    "path",
                    "per_page",
                    "repo",
                    "sha",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.repo",
            },
          },
        },
      },
      ["gist"] = {
        ["fields"] = {
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
            ["short"] = "Description of the gist",
          },
          {
            ["name"] = "files",
            ["title"] = "Files",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["op"] = {
              ["list"] = {
                ["type"] = "`$OBJECT`",
              },
            },
            ["short"] = "Names and content for the files that make up the gist",
          },
          {
            ["name"] = "html_url",
            ["title"] = "Html Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "node_id",
            ["title"] = "Node Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "owner",
            ["title"] = "Owner",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "public",
            ["title"] = "Public",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the gist is public",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "gist",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/gists",
                ["segments"] = {
                  {
                    ["lit"] = "gists",
                  },
                },
                ["parts"] = {
                  "gists",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/gists",
                ["segments"] = {
                  {
                    ["lit"] = "gists",
                  },
                },
                ["parts"] = {
                  "gists",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "page",
                    "per_page",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["issue"] = {
        ["fields"] = {
          {
            ["name"] = "assignee",
            ["title"] = "Assignee",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "assignees",
            ["title"] = "Assignees",
            ["type"] = "`$ARRAY`",
            ["short"] = "Logins for Users to assign to this issue",
          },
          {
            ["name"] = "body",
            ["title"] = "Body",
            ["type"] = "`$STRING`",
            ["short"] = "The contents of the issue",
          },
          {
            ["name"] = "closed_at",
            ["title"] = "Closed At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "comments",
            ["title"] = "Comments",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "html_url",
            ["title"] = "Html Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "labels",
            ["title"] = "Labels",
            ["type"] = "`$ARRAY`",
            ["short"] = "Labels to associate with this issue",
          },
          {
            ["name"] = "milestone",
            ["title"] = "Milestone",
            ["type"] = "`$OBJECT`",
            ["short"] = "The number of the milestone to associate this issue with",
          },
          {
            ["name"] = "node_id",
            ["title"] = "Node Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "number",
            ["title"] = "Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The issue number",
          },
          {
            ["name"] = "state",
            ["title"] = "State",
            ["type"] = "`$STRING`",
            ["short"] = "State of the issue",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The issue title",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "user",
            ["title"] = "User",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "issue",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/repos/{owner}/{repo}/issues",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "issues",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "owner",
                    "repo",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/repos/{owner}/{repo}/issues",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "issues",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "direction",
                      ["orig"] = "direction",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "desc",
                    },
                    {
                      ["name"] = "label",
                      ["orig"] = "label",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "created",
                    },
                    {
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "open",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "direction",
                    "label",
                    "owner",
                    "page",
                    "per_page",
                    "repo",
                    "sort",
                    "state",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/repos/{owner}/{repo}/issues/{issue_number}",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "issues",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["issue_number"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "issue_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "owner",
                    "repo",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/repos/{owner}/{repo}/issues/{issue_number}",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "issues",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "issues",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["issue_number"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "issue_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "owner",
                    "repo",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.repo",
            },
          },
        },
      },
      ["notification"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "last_read_at",
            ["title"] = "Last Read At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "reason",
            ["title"] = "Reason",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "repository",
            ["title"] = "Repository",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "subject",
            ["title"] = "Subject",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "unread",
            ["title"] = "Unread",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "notification",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/notifications",
                ["segments"] = {
                  {
                    ["lit"] = "notifications",
                  },
                },
                ["parts"] = {
                  "notifications",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "all",
                      ["orig"] = "all",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = false,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "participating",
                      ["orig"] = "participating",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = false,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "all",
                    "page",
                    "participating",
                    "per_page",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["org"] = {
        ["fields"] = {
          {
            ["name"] = "avatar_url",
            ["title"] = "Avatar Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "blog",
            ["title"] = "Blog",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["format"] = "email",
          },
          {
            ["name"] = "followers",
            ["title"] = "Followers",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "following",
            ["title"] = "Following",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "html_url",
            ["title"] = "Html Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "login",
            ["title"] = "Login",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "node_id",
            ["title"] = "Node Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "public_gists",
            ["title"] = "Public Gists",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "public_repos",
            ["title"] = "Public Repos",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "org",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/orgs/{org}",
                ["segments"] = {
                  {
                    ["lit"] = "orgs",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "orgs",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["org"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "org",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pull"] = {
        ["fields"] = {
          {
            ["name"] = "base",
            ["title"] = "Base",
            ["type"] = "`$OBJECT`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The name of the branch you want the changes pulled into",
          },
          {
            ["name"] = "body",
            ["title"] = "Body",
            ["type"] = "`$STRING`",
            ["short"] = "The contents of the pull request",
          },
          {
            ["name"] = "closed_at",
            ["title"] = "Closed At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "draft",
            ["title"] = "Draft",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Indicates whether the pull request is a draft",
          },
          {
            ["name"] = "head",
            ["title"] = "Head",
            ["type"] = "`$OBJECT`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The name of the branch where your changes are implemented",
          },
          {
            ["name"] = "html_url",
            ["title"] = "Html Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "merged_at",
            ["title"] = "Merged At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "node_id",
            ["title"] = "Node Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "number",
            ["title"] = "Number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "state",
            ["title"] = "State",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "The title of the pull request",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "user",
            ["title"] = "User",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "pull",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/repos/{owner}/{repo}/pulls",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "pulls",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "owner",
                    "repo",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/repos/{owner}/{repo}/pulls",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "pulls",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "direction",
                      ["orig"] = "direction",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "desc",
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "created",
                    },
                    {
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "open",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "direction",
                    "owner",
                    "page",
                    "per_page",
                    "repo",
                    "sort",
                    "state",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/repos/{owner}/{repo}/pulls/{pull_number}",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                  {
                    ["lit"] = "pulls",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                  "pulls",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["pull_number"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "pull_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "owner",
                    "repo",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.repo",
            },
          },
        },
      },
      ["rate_limit"] = {
        ["fields"] = {
          {
            ["name"] = "rate",
            ["title"] = "Rate",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "resources",
            ["title"] = "Resources",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "rate_limit",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rate_limit",
                ["segments"] = {
                  {
                    ["lit"] = "rate_limit",
                  },
                },
                ["parts"] = {
                  "rate_limit",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["repo"] = {
        ["fields"] = {
          {
            ["name"] = "avatar_url",
            ["title"] = "Avatar Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL to the user's avatar image",
            ["format"] = "uri",
          },
          {
            ["name"] = "bio",
            ["title"] = "Bio",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "blog",
            ["title"] = "Blog",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "company",
            ["title"] = "Company",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "default_branch",
            ["title"] = "Default Branch",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["title"] = "Description",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["format"] = "email",
          },
          {
            ["name"] = "followers",
            ["title"] = "Followers",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "following",
            ["title"] = "Following",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "fork",
            ["title"] = "Fork",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "forks_count",
            ["title"] = "Forks Count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "full_name",
            ["title"] = "Full Name",
            ["type"] = "`$STRING`",
            ["short"] = "The full name including owner",
          },
          {
            ["name"] = "github-rest_id",
            ["title"] = "Github Rest Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The user's unique identifier",
          },
          {
            ["name"] = "html_url",
            ["title"] = "Html Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "The user's unique identifier",
          },
          {
            ["name"] = "language",
            ["title"] = "Language",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "login",
            ["title"] = "Login",
            ["type"] = "`$STRING`",
            ["short"] = "The user's GitHub username",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "The name of the repository",
          },
          {
            ["name"] = "node_id",
            ["title"] = "Node Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "open_issues_count",
            ["title"] = "Open Issues Count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "owner",
            ["title"] = "Owner",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "private",
            ["title"] = "Private",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the repository is private",
          },
          {
            ["name"] = "public_gists",
            ["title"] = "Public Gists",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "public_repos",
            ["title"] = "Public Repos",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "pushed_at",
            ["title"] = "Pushed At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "size",
            ["title"] = "Size",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "stargazers_count",
            ["title"] = "Stargazers Count",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "visibility",
            ["title"] = "Visibility",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "watchers_count",
            ["title"] = "Watchers Count",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["owner"] = "owner.login",
            ["repo"] = "name",
          },
          ["name"] = "id",
          ["parts"] = {
            "owner",
            "repo",
          },
          ["sep"] = "/",
        },
        ["name"] = "repo",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{username}/repos",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "username",
                  },
                  {
                    ["lit"] = "repos",
                  },
                },
                ["parts"] = {
                  "users",
                  "{username}",
                  "repos",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "username",
                      ["orig"] = "username",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "direction",
                      ["orig"] = "direction",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "asc",
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "full_name",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "owner",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "direction",
                    "page",
                    "per_page",
                    "sort",
                    "type",
                    "username",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/orgs/{org}/repos",
                ["segments"] = {
                  {
                    ["lit"] = "orgs",
                  },
                  {
                    ["var"] = "org_id",
                  },
                  {
                    ["lit"] = "repos",
                  },
                },
                ["parts"] = {
                  "orgs",
                  "{org_id}",
                  "repos",
                },
                ["rename"] = {
                  ["param"] = {
                    ["org"] = "org_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "org_id",
                      ["orig"] = "org",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "all",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "org_id",
                    "page",
                    "per_page",
                    "type",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/repos/{owner}/{repo}",
                ["segments"] = {
                  {
                    ["lit"] = "repos",
                  },
                  {
                    ["var"] = "owner",
                  },
                  {
                    ["var"] = "repo",
                  },
                },
                ["parts"] = {
                  "repos",
                  "{owner}",
                  "{repo}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.owner`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "owner",
                      ["orig"] = "owner",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "repo",
                      ["orig"] = "repo",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "owner",
                    "repo",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.org",
            },
            {
              "$.main.kit.entity.user",
            },
          },
        },
      },
      ["search"] = {
        ["fields"] = {},
        ["name"] = "search",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search/issues",
                ["segments"] = {
                  {
                    ["lit"] = "search",
                  },
                  {
                    ["lit"] = "issues",
                  },
                },
                ["parts"] = {
                  "search",
                  "issues",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "desc",
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "issue",
                  ["exist"] = {
                    "order",
                    "page",
                    "per_page",
                    "q",
                    "sort",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search/repositories",
                ["segments"] = {
                  {
                    ["lit"] = "search",
                  },
                  {
                    ["lit"] = "repositories",
                  },
                },
                ["parts"] = {
                  "search",
                  "repositories",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "desc",
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 30,
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "sort",
                      ["orig"] = "sort",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "repository",
                  ["exist"] = {
                    "order",
                    "page",
                    "per_page",
                    "q",
                    "sort",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["name"] = "avatar_url",
            ["title"] = "Avatar Url",
            ["type"] = "`$STRING`",
            ["short"] = "URL to the user's avatar image",
            ["format"] = "uri",
          },
          {
            ["name"] = "bio",
            ["title"] = "Bio",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "blog",
            ["title"] = "Blog",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "company",
            ["title"] = "Company",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["format"] = "email",
          },
          {
            ["name"] = "followers",
            ["title"] = "Followers",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "following",
            ["title"] = "Following",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "html_url",
            ["title"] = "Html Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "The user's unique identifier",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "login",
            ["title"] = "Login",
            ["type"] = "`$STRING`",
            ["short"] = "The user's GitHub username",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "node_id",
            ["title"] = "Node Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "public_gists",
            ["title"] = "Public Gists",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "public_repos",
            ["title"] = "Public Repos",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["format"] = "date-time",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["format"] = "uri",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{username}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["username"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "username",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/user",
                ["segments"] = {
                  {
                    ["lit"] = "user",
                  },
                },
                ["parts"] = {
                  "user",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
