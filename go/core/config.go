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
			"slug": "github-rest",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "branches",
									},
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"branches",
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
						"format": "uri",
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
						"format": "uri",
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
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "commits",
									},
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"commits",
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
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the gist",
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
						"short": "Names and content for the files that make up the gist",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "uri",
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
						"short": "Whether the gist is public",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "gists",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"gists",
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
								"segments": []any{
									map[string]any{
										"lit": "gists",
									},
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
								"parts": []any{
									"gists",
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
						"short": "Logins for Users to assign to this issue",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"short": "The contents of the issue",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "closed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "labels",
						"short": "Labels to associate with this issue",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "milestone",
						"short": "The number of the milestone to associate this issue with",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "node_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"short": "The issue number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"short": "State of the issue",
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
						"short": "The issue title",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "issues",
									},
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
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
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "issues",
									},
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
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
								"rename": map[string]any{
									"param": map[string]any{
										"issue_number": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "issues",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
									"{id}",
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
								"rename": map[string]any{
									"param": map[string]any{
										"issue_number": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "issues",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
									"{id}",
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
						"format": "date-time",
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
						"format": "date-time",
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "notifications",
									},
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
								"parts": []any{
									"notifications",
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
						"format": "uri",
						"name": "avatar_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "blog",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
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
						"format": "uri",
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
						"format": "date-time",
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"rename": map[string]any{
									"param": map[string]any{
										"org": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "orgs",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"orgs",
									"{id}",
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
						"short": "The name of the branch you want the changes pulled into",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "body",
						"short": "The contents of the pull request",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "closed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "draft",
						"short": "Indicates whether the pull request is a draft",
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
						"short": "The name of the branch where your changes are implemented",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "uri",
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
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
						"short": "The title of the pull request",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "pulls",
									},
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
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
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "pulls",
									},
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
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
								"rename": map[string]any{
									"param": map[string]any{
										"pull_number": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
									map[string]any{
										"lit": "pulls",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
									"{id}",
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
								"segments": []any{
									map[string]any{
										"lit": "rate_limit",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"rate_limit",
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
						"format": "uri",
						"name": "avatar_url",
						"short": "URL to the user's avatar image",
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
						"format": "date-time",
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
						"format": "email",
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
						"short": "The full name including owner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "github-rest_id",
						"short": "The user's unique identifier",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "uri",
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The user's unique identifier",
						"type": "`$STRING`",
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
						"short": "The user's GitHub username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The name of the repository",
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
						"short": "Whether the repository is private",
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
						"format": "date-time",
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
						"format": "date-time",
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
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
				"id": map[string]any{
					"field": "id",
					"from": map[string]any{
						"owner": "owner.login",
						"repo": "name",
					},
					"name": "id",
					"parts": []any{
						"owner",
						"repo",
					},
					"sep": "/",
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
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "repos",
									},
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
								"parts": []any{
									"users",
									"{username}",
									"repos",
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
								"rename": map[string]any{
									"param": map[string]any{
										"org": "org_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "orgs",
									},
									map[string]any{
										"var": "org_id",
									},
									map[string]any{
										"lit": "repos",
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
								"parts": []any{
									"orgs",
									"{org_id}",
									"repos",
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
								"segments": []any{
									map[string]any{
										"lit": "repos",
									},
									map[string]any{
										"var": "owner",
									},
									map[string]any{
										"var": "repo",
									},
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
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
				"fields": []any{},
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
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "issues",
									},
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
								"parts": []any{
									"search",
									"issues",
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
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
									map[string]any{
										"lit": "repositories",
									},
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
								"parts": []any{
									"search",
									"repositories",
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
						"format": "uri",
						"name": "avatar_url",
						"short": "URL to the user's avatar image",
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
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
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
						"format": "uri",
						"name": "html_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The user's unique identifier",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "login",
						"short": "The user's GitHub username",
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
						"format": "date-time",
						"name": "updated_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"rename": map[string]any{
									"param": map[string]any{
										"username": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"users",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"user",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
