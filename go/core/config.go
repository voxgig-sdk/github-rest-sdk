package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "GithubRest",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.github.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"branch": map[string]any{},
				"commit": map[string]any{},
				"gist": map[string]any{},
				"issue": map[string]any{},
				"notification": map[string]any{},
				"org": map[string]any{},
				"pull": map[string]any{},
				"rate_limit": map[string]any{},
				"repo": map[string]any{},
				"search": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"branch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "commit",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "protected",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "branch",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/branches",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"branches",
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"page",
										"per_page",
										"repo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"repo",
						},
					},
				},
			},
			"commit": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "commit",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "committer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sha",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "commit",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "path",
											"orig": "path",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "sha",
											"orig": "sha",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/commits",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"commits",
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"page",
										"path",
										"per_page",
										"repo",
										"sha",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"repo",
						},
					},
				},
			},
			"gist": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "files",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$OBJECT`",
							},
						},
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "public",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "gist",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/gists",
								"parts": []any{
									"gists",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/gists",
								"parts": []any{
									"gists",
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"issue": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "assignee",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "assignees",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "closed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "labels",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "milestone",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user",
						"type": "`$OBJECT`",
					},
				},
				"name": "issue",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/repos/{owner}/{repo}/issues",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"repo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "label",
											"orig": "label",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "created",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "open",
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/issues",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
								},
								"select": map[string]any{
									"exist": []any{
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "issue_number",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/issues/{issue_number}",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"issue_number": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"owner",
										"repo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "issue_number",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/repos/{owner}/{repo}/issues/{issue_number}",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"issue_number": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"owner",
										"repo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"repo",
						},
					},
				},
			},
			"notification": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_read_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reason",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "repository",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "subject",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "unread",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "notification",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "all",
											"orig": "all",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "participating",
											"orig": "participating",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/notifications",
								"parts": []any{
									"notifications",
								},
								"select": map[string]any{
									"exist": []any{
										"all",
										"page",
										"participating",
										"per_page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"org": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "avatar_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "blog",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "followers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "following",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "login",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "public_gists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "public_repos",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "org",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "org",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/orgs/{org}",
								"parts": []any{
									"orgs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"org": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pull": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "base",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "closed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "draft",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "head",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "merged_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user",
						"type": "`$OBJECT`",
					},
				},
				"name": "pull",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/repos/{owner}/{repo}/pulls",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"repo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "created",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "open",
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/pulls",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
								},
								"select": map[string]any{
									"exist": []any{
										"direction",
										"owner",
										"page",
										"per_page",
										"repo",
										"sort",
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "pull_number",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/pulls/{pull_number}",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"pull_number": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"owner",
										"repo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"repo",
						},
					},
				},
			},
			"rate_limit": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "rate",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "resources",
						"type": "`$OBJECT`",
					},
				},
				"name": "rate_limit",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/rate_limit",
								"parts": []any{
									"rate_limit",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"repo": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "avatar_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "blog",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "default_branch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "followers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "following",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "fork",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "forks_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "full_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "login",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "open_issues_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "owner",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "private",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "public_gists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "public_repos",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pushed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stargazers_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visibility",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "watchers_count",
						"type": "`$INTEGER`",
					},
				},
				"name": "repo",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "username",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "asc",
											"kind": "query",
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "full_name",
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "owner",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{username}/repos",
								"parts": []any{
									"users",
									"{username}",
									"repos",
								},
								"select": map[string]any{
									"exist": []any{
										"direction",
										"page",
										"per_page",
										"sort",
										"type",
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "org_id",
											"orig": "org",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "all",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/orgs/{org}/repos",
								"parts": []any{
									"orgs",
									"{org_id}",
									"repos",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"org": "org_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"org_id",
										"page",
										"per_page",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "owner",
											"orig": "owner",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "repo",
											"orig": "repo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}",
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"repo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.owner`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"org",
						},
						[]any{
							"repo",
						},
						[]any{
							"user",
						},
					},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "assignee",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "assignees",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "closed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "default_branch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fork",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "forks_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "full_name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "labels",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "milestone",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "open_issues_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "owner",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "private",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "pushed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stargazers_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "visibility",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "watchers_count",
						"type": "`$INTEGER`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search/issues",
								"parts": []any{
									"search",
									"issues",
								},
								"select": map[string]any{
									"$action": "issue",
									"exist": []any{
										"order",
										"page",
										"per_page",
										"q",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "desc",
											"kind": "query",
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search/repositories",
								"parts": []any{
									"search",
									"repositories",
								},
								"select": map[string]any{
									"$action": "repository",
									"exist": []any{
										"order",
										"page",
										"per_page",
										"q",
										"sort",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "avatar_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "blog",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "followers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "following",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "login",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "public_gists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "public_repos",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "user",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{username}",
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"username": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/user",
								"parts": []any{
									"user",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
