
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.github.com',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      branch: {
      },

      commit: {
      },

      gist: {
      },

      issue: {
      },

      notification: {
      },

      org: {
      },

      pull: {
      },

      rate_limit: {
      },

      repo: {
      },

      search: {
      },

      user: {
      },

    }
  }


  entity = {
    "branch": {
      "fields": [
        {
          "name": "commit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "protected",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "branch",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/repos/{owner}/{repo}/branches",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "branches"
              ],
              "select": {
                "exist": [
                  "owner",
                  "page",
                  "per_page",
                  "repo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": [
          [
            "repo"
          ]
        ]
      }
    },
    "commit": {
      "fields": [
        {
          "name": "author",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "commit",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 1
        },
        {
          "name": "committer",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "sha",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        }
      ],
      "name": "commit",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "path",
                    "orig": "path",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "sha",
                    "orig": "sha",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/repos/{owner}/{repo}/commits",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "commits"
              ],
              "select": {
                "exist": [
                  "owner",
                  "page",
                  "path",
                  "per_page",
                  "repo",
                  "sha"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": [
          [
            "repo"
          ]
        ]
      }
    },
    "gist": {
      "fields": [
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "file",
          "op": {
            "list": {
              "req": false,
              "type": "`$OBJECT`"
            }
          },
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "owner",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 6
        },
        {
          "name": "public",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 7
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        }
      ],
      "name": "gist",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "method": "POST",
              "orig": "/gists",
              "parts": [
                "gists"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/gists",
              "parts": [
                "gists"
              ],
              "select": {
                "exist": [
                  "page",
                  "per_page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "issue": {
      "fields": [
        {
          "name": "assignee",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "body",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "closed_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "comment",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "label",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 7
        },
        {
          "name": "milestone",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 8
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "number",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "title",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "user",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 15
        }
      ],
      "name": "issue",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/repos/{owner}/{repo}/issues",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "issues"
              ],
              "select": {
                "exist": [
                  "owner",
                  "repo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "label",
                    "orig": "label",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "created",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "open",
                    "kind": "query",
                    "name": "state",
                    "orig": "state",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/repos/{owner}/{repo}/issues",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "issues"
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
                  "state"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "issue_number",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/repos/{owner}/{repo}/issues/{issue_number}",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "issues",
                "{id}"
              ],
              "rename": {
                "param": {
                  "issue_number": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "owner",
                  "repo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        },
        "update": {
          "name": "update",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "issue_number",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "PATCH",
              "orig": "/repos/{owner}/{repo}/issues/{issue_number}",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "issues",
                "{id}"
              ],
              "rename": {
                "param": {
                  "issue_number": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "owner",
                  "repo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "update"
        }
      },
      "relations": {
        "ancestors": [
          [
            "repo"
          ]
        ]
      }
    },
    "notification": {
      "fields": [
        {
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "last_read_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "reason",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "repository",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 3
        },
        {
          "name": "subject",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 4
        },
        {
          "name": "unread",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 5
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        }
      ],
      "name": "notification",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": false,
                    "kind": "query",
                    "name": "all",
                    "orig": "all",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "participating",
                    "orig": "participating",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/notifications",
              "parts": [
                "notifications"
              ],
              "select": {
                "exist": [
                  "all",
                  "page",
                  "participating",
                  "per_page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "org": {
      "fields": [
        {
          "name": "avatar_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "blog",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "email",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "follower",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "following",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "location",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "login",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "public_gist",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 13
        },
        {
          "name": "public_repo",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 14
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 15
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        }
      ],
      "name": "org",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "org",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/orgs/{org}",
              "parts": [
                "orgs",
                "{id}"
              ],
              "rename": {
                "param": {
                  "org": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "pull": {
      "fields": [
        {
          "name": "base",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "body",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "closed_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "draft",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 4
        },
        {
          "name": "head",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 5
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "merged_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "number",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "title",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "user",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 15
        }
      ],
      "name": "pull",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/repos/{owner}/{repo}/pulls",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "pulls"
              ],
              "select": {
                "exist": [
                  "owner",
                  "repo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "created",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "open",
                    "kind": "query",
                    "name": "state",
                    "orig": "state",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/repos/{owner}/{repo}/pulls",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "pulls"
              ],
              "select": {
                "exist": [
                  "direction",
                  "owner",
                  "page",
                  "per_page",
                  "repo",
                  "sort",
                  "state"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "pull_number",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/repos/{owner}/{repo}/pulls/{pull_number}",
              "parts": [
                "repos",
                "{owner}",
                "{repo}",
                "pulls",
                "{id}"
              ],
              "rename": {
                "param": {
                  "pull_number": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "owner",
                  "repo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "repo"
          ]
        ]
      }
    },
    "rate_limit": {
      "fields": [
        {
          "name": "rate",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "resource",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "rate_limit",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "method": "GET",
              "orig": "/rate_limit",
              "parts": [
                "rate_limit"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "repo": {
      "fields": [
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "default_branch",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "fork",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 3
        },
        {
          "name": "forks_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        },
        {
          "name": "full_name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "language",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "open_issues_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 11
        },
        {
          "name": "owner",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 12
        },
        {
          "name": "private",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 13
        },
        {
          "name": "pushed_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "size",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 15
        },
        {
          "name": "stargazers_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 16
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 17
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 18
        },
        {
          "name": "visibility",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 19
        },
        {
          "name": "watchers_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 20
        }
      ],
      "name": "repo",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "username",
                    "orig": "username",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "asc",
                    "kind": "query",
                    "name": "direction",
                    "orig": "direction",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "full_name",
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "owner",
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/users/{username}/repos",
              "parts": [
                "users",
                "{username}",
                "repos"
              ],
              "select": {
                "exist": [
                  "direction",
                  "page",
                  "per_page",
                  "sort",
                  "type",
                  "username"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "org_id",
                    "orig": "org",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "all",
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/orgs/{org}/repos",
              "parts": [
                "orgs",
                "{org_id}",
                "repos"
              ],
              "rename": {
                "param": {
                  "org": "org_id"
                }
              },
              "select": {
                "exist": [
                  "org_id",
                  "page",
                  "per_page",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "owner",
                    "orig": "owner",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "repo",
                    "orig": "repo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/repos/{owner}/{repo}",
              "parts": [
                "repos",
                "{owner}",
                "{repo}"
              ],
              "select": {
                "exist": [
                  "owner",
                  "repo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "org"
          ],
          [
            "repo"
          ],
          [
            "user"
          ]
        ]
      }
    },
    "search": {
      "fields": [
        {
          "name": "assignee",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "body",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "closed_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "comment",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "default_branch",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "description",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "fork",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 7
        },
        {
          "name": "forks_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "full_name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 11
        },
        {
          "name": "label",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 12
        },
        {
          "name": "language",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "milestone",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 14
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 15
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        },
        {
          "name": "number",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 17
        },
        {
          "name": "open_issues_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 18
        },
        {
          "name": "owner",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 19
        },
        {
          "name": "private",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 20
        },
        {
          "name": "pushed_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 21
        },
        {
          "name": "size",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 22
        },
        {
          "name": "stargazers_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 23
        },
        {
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 24
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 25
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 26
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 27
        },
        {
          "name": "user",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 28
        },
        {
          "name": "visibility",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 29
        },
        {
          "name": "watchers_count",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 30
        }
      ],
      "name": "search",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/search/issues",
              "parts": [
                "search",
                "issues"
              ],
              "select": {
                "$action": "issue",
                "exist": [
                  "order",
                  "page",
                  "per_page",
                  "q",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": "desc",
                    "kind": "query",
                    "name": "order",
                    "orig": "order",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": 30,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "sort",
                    "orig": "sort",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/search/repositories",
              "parts": [
                "search",
                "repositories"
              ],
              "select": {
                "$action": "repository",
                "exist": [
                  "order",
                  "page",
                  "per_page",
                  "q",
                  "sort"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "name": "avatar_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "bio",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "blog",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "company",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "created_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "email",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "follower",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "following",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "html_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 9
        },
        {
          "name": "location",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "login",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "node_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "public_gist",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 14
        },
        {
          "name": "public_repo",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 15
        },
        {
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        },
        {
          "name": "updated_at",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 17
        },
        {
          "name": "url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 18
        }
      ],
      "name": "user",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "username",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/users/{username}",
              "parts": [
                "users",
                "{id}"
              ],
              "rename": {
                "param": {
                  "username": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "method": "GET",
              "orig": "/user",
              "parts": [
                "user"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

