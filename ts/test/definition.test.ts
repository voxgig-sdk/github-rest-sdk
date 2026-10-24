import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "branch",
    "accessor": "Branch",
    "op": "list",
    "method": "GET",
    "path": "/repos/{owner}/{repo}/branches",
    "args": [
      {
        "name": "owner",
        "wire": "owner",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {
      "page": 1,
      "per_page": 30
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "name": "x",
        "commit": {
          "sha": "x",
          "url": "x"
        },
        "protected": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "commit",
    "accessor": "Commit",
    "op": "list",
    "method": "GET",
    "path": "/repos/{owner}/{repo}/commits",
    "args": [
      {
        "name": "owner",
        "wire": "owner",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {
      "page": 1,
      "path": "v1",
      "per_page": 30,
      "sha": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "sha",
      "path",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "path",
        "wire": "path"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      },
      {
        "name": "sha",
        "wire": "sha"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "sha": "x",
        "node_id": "x",
        "commit": {
          "author": {
            "name": "x",
            "email": "x",
            "date": "2026-01-01T00:00:00Z"
          },
          "message": "x"
        },
        "author": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "committer": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "html_url": "x",
        "url": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "gist",
    "accessor": "Gist",
    "op": "create",
    "method": "POST",
    "path": "/gists",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": "x",
      "node_id": "x",
      "url": "x",
      "html_url": "x",
      "description": "x",
      "public": true,
      "owner": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "files": {},
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "gist",
    "accessor": "Gist",
    "op": "list",
    "method": "GET",
    "path": "/gists",
    "args": [],
    "select": {
      "page": 1,
      "per_page": 30
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      }
    ],
    "auth": [],
    "status": 200,
    "sample": [
      {
        "id": "x",
        "node_id": "x",
        "url": "x",
        "html_url": "x",
        "description": "x",
        "public": true,
        "owner": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "files": {},
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "create",
    "method": "POST",
    "path": "/repos/{owner}/{repo}/issues",
    "args": [
      {
        "name": "owner",
        "wire": "owner",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": 1,
      "node_id": "x",
      "number": 1,
      "title": "x",
      "user": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "labels": [
        {
          "id": 1,
          "node_id": "x",
          "name": "x",
          "color": "x",
          "default": true,
          "description": "x"
        }
      ],
      "state": "open",
      "assignee": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "assignees": [
        {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        }
      ],
      "milestone": {},
      "comments": 1,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "closed_at": "2026-01-01T00:00:00Z",
      "body": "x",
      "html_url": "x",
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "list",
    "method": "GET",
    "path": "/repos/{owner}/{repo}/issues",
    "args": [
      {
        "name": "owner",
        "wire": "owner",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {
      "direction": "desc",
      "label": "v1",
      "page": 1,
      "per_page": 30,
      "sort": "created",
      "state": "open"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "state",
      "labels",
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "direction",
        "wire": "direction"
      },
      {
        "name": "label",
        "wire": "labels"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "state",
        "wire": "state"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": 1,
        "node_id": "x",
        "number": 1,
        "title": "x",
        "user": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "labels": [
          {
            "id": 1,
            "node_id": "x",
            "name": "x",
            "color": "x",
            "default": true,
            "description": "x"
          }
        ],
        "state": "open",
        "assignee": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "assignees": [
          {
            "login": "x",
            "id": 1,
            "node_id": "x",
            "avatar_url": "x",
            "url": "x",
            "html_url": "x",
            "type": "User",
            "name": "x",
            "company": "x",
            "blog": "x",
            "location": "x",
            "email": "x",
            "bio": "x",
            "public_repos": 1,
            "public_gists": 1,
            "followers": 1,
            "following": 1,
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
          }
        ],
        "milestone": {},
        "comments": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "closed_at": "2026-01-01T00:00:00Z",
        "body": "x",
        "html_url": "x",
        "url": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "load",
    "method": "GET",
    "path": "/repos/{owner}/{repo}/issues/{issue_number}",
    "args": [
      {
        "name": "id",
        "wire": "issue_number",
        "value": "p1"
      },
      {
        "name": "owner",
        "wire": "owner",
        "value": "p2"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p3"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": 1,
      "node_id": "x",
      "number": 1,
      "title": "x",
      "user": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "labels": [
        {
          "id": 1,
          "node_id": "x",
          "name": "x",
          "color": "x",
          "default": true,
          "description": "x"
        }
      ],
      "state": "open",
      "assignee": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "assignees": [
        {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        }
      ],
      "milestone": {},
      "comments": 1,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "closed_at": "2026-01-01T00:00:00Z",
      "body": "x",
      "html_url": "x",
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "issue",
    "accessor": "Issue",
    "op": "update",
    "method": "PATCH",
    "path": "/repos/{owner}/{repo}/issues/{issue_number}",
    "args": [
      {
        "name": "id",
        "wire": "issue_number",
        "value": "p1"
      },
      {
        "name": "owner",
        "wire": "owner",
        "value": "p2"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p3"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": 1,
      "node_id": "x",
      "number": 1,
      "title": "x",
      "user": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "labels": [
        {
          "id": 1,
          "node_id": "x",
          "name": "x",
          "color": "x",
          "default": true,
          "description": "x"
        }
      ],
      "state": "open",
      "assignee": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "assignees": [
        {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        }
      ],
      "milestone": {},
      "comments": 1,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "closed_at": "2026-01-01T00:00:00Z",
      "body": "x",
      "html_url": "x",
      "url": "x"
    },
    "idField": "id"
  },
  {
    "entity": "notification",
    "accessor": "Notification",
    "op": "list",
    "method": "GET",
    "path": "/notifications",
    "args": [],
    "select": {
      "all": "v1",
      "page": 1,
      "participating": "v1",
      "per_page": 30
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "all",
      "participating",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "all",
        "wire": "all"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "participating",
        "wire": "participating"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": "x",
        "unread": true,
        "reason": "x",
        "updated_at": "2026-01-01T00:00:00Z",
        "last_read_at": "2026-01-01T00:00:00Z",
        "subject": {
          "title": "x",
          "url": "x",
          "type": "x"
        },
        "repository": {
          "id": 1,
          "node_id": "x",
          "name": "x",
          "full_name": "x",
          "owner": {
            "login": "x",
            "id": 1,
            "node_id": "x",
            "avatar_url": "x",
            "url": "x",
            "html_url": "x",
            "type": "User",
            "name": "x",
            "company": "x",
            "blog": "x",
            "location": "x",
            "email": "x",
            "bio": "x",
            "public_repos": 1,
            "public_gists": 1,
            "followers": 1,
            "following": 1,
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
          },
          "private": true,
          "html_url": "x",
          "description": "x",
          "fork": true,
          "url": "x",
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z",
          "pushed_at": "2026-01-01T00:00:00Z",
          "size": 1,
          "stargazers_count": 1,
          "watchers_count": 1,
          "language": "x",
          "forks_count": 1,
          "open_issues_count": 1,
          "default_branch": "x",
          "visibility": "public"
        },
        "url": "x"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "org",
    "accessor": "Org",
    "op": "load",
    "method": "GET",
    "path": "/orgs/{org}",
    "args": [
      {
        "name": "id",
        "wire": "org",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "login": "x",
      "id": 1,
      "node_id": "x",
      "url": "x",
      "html_url": "x",
      "name": "x",
      "description": "x",
      "email": "x",
      "blog": "x",
      "location": "x",
      "avatar_url": "x",
      "public_repos": 1,
      "public_gists": 1,
      "followers": 1,
      "following": 1,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "pull",
    "accessor": "Pull",
    "op": "create",
    "method": "POST",
    "path": "/repos/{owner}/{repo}/pulls",
    "args": [
      {
        "name": "owner",
        "wire": "owner",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "id": 1,
      "node_id": "x",
      "number": 1,
      "state": "open",
      "title": "x",
      "user": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "body": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "closed_at": "2026-01-01T00:00:00Z",
      "merged_at": "2026-01-01T00:00:00Z",
      "head": {
        "ref": "x",
        "sha": "x"
      },
      "base": {
        "ref": "x",
        "sha": "x"
      },
      "html_url": "x",
      "url": "x",
      "draft": true
    },
    "idField": "id"
  },
  {
    "entity": "pull",
    "accessor": "Pull",
    "op": "list",
    "method": "GET",
    "path": "/repos/{owner}/{repo}/pulls",
    "args": [
      {
        "name": "owner",
        "wire": "owner",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {
      "direction": "desc",
      "page": 1,
      "per_page": 30,
      "sort": "created",
      "state": "open"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "state",
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "direction",
        "wire": "direction"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "state",
        "wire": "state"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": 1,
        "node_id": "x",
        "number": 1,
        "state": "open",
        "title": "x",
        "user": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "body": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "closed_at": "2026-01-01T00:00:00Z",
        "merged_at": "2026-01-01T00:00:00Z",
        "head": {
          "ref": "x",
          "sha": "x"
        },
        "base": {
          "ref": "x",
          "sha": "x"
        },
        "html_url": "x",
        "url": "x",
        "draft": true
      }
    ],
    "idField": "id"
  },
  {
    "entity": "pull",
    "accessor": "Pull",
    "op": "load",
    "method": "GET",
    "path": "/repos/{owner}/{repo}/pulls/{pull_number}",
    "args": [
      {
        "name": "id",
        "wire": "pull_number",
        "value": "p1"
      },
      {
        "name": "owner",
        "wire": "owner",
        "value": "p2"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p3"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": 1,
      "node_id": "x",
      "number": 1,
      "state": "open",
      "title": "x",
      "user": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "body": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "closed_at": "2026-01-01T00:00:00Z",
      "merged_at": "2026-01-01T00:00:00Z",
      "head": {
        "ref": "x",
        "sha": "x"
      },
      "base": {
        "ref": "x",
        "sha": "x"
      },
      "html_url": "x",
      "url": "x",
      "draft": true
    },
    "idField": "id"
  },
  {
    "entity": "rate_limit",
    "accessor": "RateLimit",
    "op": "load",
    "method": "GET",
    "path": "/rate_limit",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [],
    "status": 200,
    "sample": {
      "resources": {
        "core": {
          "limit": 1,
          "remaining": 1,
          "reset": 1,
          "used": 1
        },
        "search": {
          "limit": 1,
          "remaining": 1,
          "reset": 1,
          "used": 1
        },
        "graphql": {
          "limit": 1,
          "remaining": 1,
          "reset": 1,
          "used": 1
        }
      },
      "rate": {
        "limit": 1,
        "remaining": 1,
        "reset": 1,
        "used": 1
      }
    },
    "idField": "id"
  },
  {
    "entity": "repo",
    "accessor": "Repo",
    "op": "list",
    "method": "GET",
    "path": "/orgs/{org}/repos",
    "args": [
      {
        "name": "org_id",
        "wire": "org",
        "value": "p1"
      }
    ],
    "select": {
      "page": 1,
      "per_page": 30,
      "type": "all"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "type",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      },
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": 1,
        "node_id": "x",
        "name": "x",
        "full_name": "x",
        "owner": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "private": true,
        "html_url": "x",
        "description": "x",
        "fork": true,
        "url": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "pushed_at": "2026-01-01T00:00:00Z",
        "size": 1,
        "stargazers_count": 1,
        "watchers_count": 1,
        "language": "x",
        "forks_count": 1,
        "open_issues_count": 1,
        "default_branch": "x",
        "visibility": "public"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "repo",
    "accessor": "Repo",
    "op": "list",
    "method": "GET",
    "path": "/users/{username}/repos",
    "args": [
      {
        "name": "username",
        "wire": "username",
        "value": "p1"
      }
    ],
    "select": {
      "direction": "asc",
      "page": 1,
      "per_page": 30,
      "sort": "full_name",
      "type": "owner"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "type",
      "sort",
      "direction",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "direction",
        "wire": "direction"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      },
      {
        "name": "sort",
        "wire": "sort"
      },
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": [
      {
        "id": 1,
        "node_id": "x",
        "name": "x",
        "full_name": "x",
        "owner": {
          "login": "x",
          "id": 1,
          "node_id": "x",
          "avatar_url": "x",
          "url": "x",
          "html_url": "x",
          "type": "User",
          "name": "x",
          "company": "x",
          "blog": "x",
          "location": "x",
          "email": "x",
          "bio": "x",
          "public_repos": 1,
          "public_gists": 1,
          "followers": 1,
          "following": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z"
        },
        "private": true,
        "html_url": "x",
        "description": "x",
        "fork": true,
        "url": "x",
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z",
        "pushed_at": "2026-01-01T00:00:00Z",
        "size": 1,
        "stargazers_count": 1,
        "watchers_count": 1,
        "language": "x",
        "forks_count": 1,
        "open_issues_count": 1,
        "default_branch": "x",
        "visibility": "public"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "repo",
    "accessor": "Repo",
    "op": "load",
    "method": "GET",
    "path": "/repos/{owner}/{repo}",
    "args": [
      {
        "name": "owner",
        "wire": "owner",
        "value": "p1"
      },
      {
        "name": "repo",
        "wire": "repo",
        "value": "p2"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": 1,
      "node_id": "x",
      "name": "x",
      "full_name": "x",
      "owner": {
        "login": "x",
        "id": 1,
        "node_id": "x",
        "avatar_url": "x",
        "url": "x",
        "html_url": "x",
        "type": "User",
        "name": "x",
        "company": "x",
        "blog": "x",
        "location": "x",
        "email": "x",
        "bio": "x",
        "public_repos": 1,
        "public_gists": 1,
        "followers": 1,
        "following": 1,
        "created_at": "2026-01-01T00:00:00Z",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "private": true,
      "html_url": "x",
      "description": "x",
      "fork": true,
      "url": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z",
      "pushed_at": "2026-01-01T00:00:00Z",
      "size": 1,
      "stargazers_count": 1,
      "watchers_count": 1,
      "language": "x",
      "forks_count": 1,
      "open_issues_count": 1,
      "default_branch": "x",
      "visibility": "public"
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/search/issues",
    "action": "issue",
    "args": [],
    "select": {
      "q": "v1",
      "order": "desc",
      "page": 1,
      "per_page": 30,
      "sort": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "total_count": 1,
      "incomplete_results": true,
      "items": [
        {
          "id": 1,
          "node_id": "x",
          "number": 1,
          "title": "x",
          "user": {
            "login": "x",
            "id": 1,
            "node_id": "x",
            "avatar_url": "x",
            "url": "x",
            "html_url": "x",
            "type": "User",
            "name": "x",
            "company": "x",
            "blog": "x",
            "location": "x",
            "email": "x",
            "bio": "x",
            "public_repos": 1,
            "public_gists": 1,
            "followers": 1,
            "following": 1,
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
          },
          "labels": [
            {
              "id": 1,
              "node_id": "x",
              "name": "x",
              "color": "x",
              "default": true,
              "description": "x"
            }
          ],
          "state": "open",
          "assignee": {
            "login": "x",
            "id": 1,
            "node_id": "x",
            "avatar_url": "x",
            "url": "x",
            "html_url": "x",
            "type": "User",
            "name": "x",
            "company": "x",
            "blog": "x",
            "location": "x",
            "email": "x",
            "bio": "x",
            "public_repos": 1,
            "public_gists": 1,
            "followers": 1,
            "following": 1,
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
          },
          "assignees": [
            {
              "login": "x",
              "id": 1,
              "node_id": "x",
              "avatar_url": "x",
              "url": "x",
              "html_url": "x",
              "type": "User",
              "name": "x",
              "company": "x",
              "blog": "x",
              "location": "x",
              "email": "x",
              "bio": "x",
              "public_repos": 1,
              "public_gists": 1,
              "followers": 1,
              "following": 1,
              "created_at": "2026-01-01T00:00:00Z",
              "updated_at": "2026-01-01T00:00:00Z"
            }
          ],
          "milestone": {},
          "comments": 1,
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z",
          "closed_at": "2026-01-01T00:00:00Z",
          "body": "x",
          "html_url": "x",
          "url": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/search/repositories",
    "action": "repository",
    "args": [],
    "select": {
      "q": "v1",
      "order": "desc",
      "page": 1,
      "per_page": 30,
      "sort": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "q",
      "sort",
      "order",
      "per_page",
      "page"
    ],
    "queryArgs": [
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "per_page",
        "wire": "per_page"
      },
      {
        "name": "q",
        "wire": "q"
      },
      {
        "name": "sort",
        "wire": "sort"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "total_count": 1,
      "incomplete_results": true,
      "items": [
        {
          "id": 1,
          "node_id": "x",
          "name": "x",
          "full_name": "x",
          "owner": {
            "login": "x",
            "id": 1,
            "node_id": "x",
            "avatar_url": "x",
            "url": "x",
            "html_url": "x",
            "type": "User",
            "name": "x",
            "company": "x",
            "blog": "x",
            "location": "x",
            "email": "x",
            "bio": "x",
            "public_repos": 1,
            "public_gists": 1,
            "followers": 1,
            "following": 1,
            "created_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
          },
          "private": true,
          "html_url": "x",
          "description": "x",
          "fork": true,
          "url": "x",
          "created_at": "2026-01-01T00:00:00Z",
          "updated_at": "2026-01-01T00:00:00Z",
          "pushed_at": "2026-01-01T00:00:00Z",
          "size": 1,
          "stargazers_count": 1,
          "watchers_count": 1,
          "language": "x",
          "forks_count": 1,
          "open_issues_count": 1,
          "default_branch": "x",
          "visibility": "public"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "load",
    "method": "GET",
    "path": "/users/{username}",
    "args": [
      {
        "name": "id",
        "wire": "username",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "login": "x",
      "id": 1,
      "node_id": "x",
      "avatar_url": "x",
      "url": "x",
      "html_url": "x",
      "type": "User",
      "name": "x",
      "company": "x",
      "blog": "x",
      "location": "x",
      "email": "x",
      "bio": "x",
      "public_repos": 1,
      "public_gists": 1,
      "followers": 1,
      "following": 1,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "load",
    "method": "GET",
    "path": "/user",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "login": "x",
      "id": 1,
      "node_id": "x",
      "avatar_url": "x",
      "url": "x",
      "html_url": "x",
      "type": "User",
      "name": "x",
      "company": "x",
      "blog": "x",
      "location": "x",
      "email": "x",
      "bio": "x",
      "public_repos": 1,
      "public_gists": 1,
      "followers": 1,
      "following": 1,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-01T00:00:00Z"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
