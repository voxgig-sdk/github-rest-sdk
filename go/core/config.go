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
						"title": "Commit",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "protected",
						"title": "Protected",
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"branches",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.repo",
						},
					},
				},
			},
			"commit": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "author",
						"title": "Author",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "commit",
						"title": "Commit",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "committer",
						"title": "Committer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "html_url",
						"title": "Html Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "node_id",
						"title": "Node Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sha",
						"title": "Sha",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
					},
				},
				"name": "commit",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"commits",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "path",
											"orig": "path",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
										map[string]any{
											"name": "sha",
											"orig": "sha",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.repo",
						},
					},
				},
			},
			"gist": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the gist",
					},
					map[string]any{
						"name": "files",
						"title": "Files",
						"type": "`$OBJECT`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$OBJECT`",
							},
						},
						"short": "Names and content for the files that make up the gist",
					},
					map[string]any{
						"name": "html_url",
						"title": "Html Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"title": "Node Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "public",
						"title": "Public",
						"type": "`$BOOLEAN`",
						"short": "Whether the gist is public",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
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
								"kind": "http",
								"method": "POST",
								"orig": "/gists",
								"segments": []any{
									map[string]any{
										"lit": "gists",
									},
								},
								"parts": []any{
									"gists",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/gists",
								"segments": []any{
									map[string]any{
										"lit": "gists",
									},
								},
								"parts": []any{
									"gists",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"per_page",
									},
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
						"title": "Assignee",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "assignees",
						"title": "Assignees",
						"type": "`$ARRAY`",
						"short": "Logins for Users to assign to this issue",
					},
					map[string]any{
						"name": "body",
						"title": "Body",
						"type": "`$STRING`",
						"short": "The contents of the issue",
					},
					map[string]any{
						"name": "closed_at",
						"title": "Closed At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "comments",
						"title": "Comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "html_url",
						"title": "Html Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "labels",
						"title": "Labels",
						"type": "`$ARRAY`",
						"short": "Labels to associate with this issue",
					},
					map[string]any{
						"name": "milestone",
						"title": "Milestone",
						"type": "`$OBJECT`",
						"short": "The number of the milestone to associate this issue with",
					},
					map[string]any{
						"name": "node_id",
						"title": "Node Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$INTEGER`",
						"short": "The issue number",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"short": "State of the issue",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The issue title",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "user",
						"title": "User",
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"repo",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"issues",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
										map[string]any{
											"name": "label",
											"orig": "label",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "created",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"example": "open",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/issues/{issue_number}",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "issue_number",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"owner",
										"repo",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/repos/{owner}/{repo}/issues/{issue_number}",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "issue_number",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"owner",
										"repo",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.repo",
						},
					},
				},
			},
			"notification": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_read_at",
						"title": "Last Read At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "reason",
						"title": "Reason",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "repository",
						"title": "Repository",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "unread",
						"title": "Unread",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
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
								"kind": "http",
								"method": "GET",
								"orig": "/notifications",
								"segments": []any{
									map[string]any{
										"lit": "notifications",
									},
								},
								"parts": []any{
									"notifications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "all",
											"orig": "all",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "participating",
											"orig": "participating",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
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
						"title": "Avatar Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "blog",
						"title": "Blog",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"format": "email",
					},
					map[string]any{
						"name": "followers",
						"title": "Followers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "following",
						"title": "Following",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "html_url",
						"title": "Html Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "login",
						"title": "Login",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"title": "Node Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "public_gists",
						"title": "Public Gists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "public_repos",
						"title": "Public Repos",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
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
								"kind": "http",
								"method": "GET",
								"orig": "/orgs/{org}",
								"segments": []any{
									map[string]any{
										"lit": "orgs",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"orgs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"org": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "org",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Base",
						"type": "`$OBJECT`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The name of the branch you want the changes pulled into",
					},
					map[string]any{
						"name": "body",
						"title": "Body",
						"type": "`$STRING`",
						"short": "The contents of the pull request",
					},
					map[string]any{
						"name": "closed_at",
						"title": "Closed At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "draft",
						"title": "Draft",
						"type": "`$BOOLEAN`",
						"short": "Indicates whether the pull request is a draft",
					},
					map[string]any{
						"name": "head",
						"title": "Head",
						"type": "`$OBJECT`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The name of the branch where your changes are implemented",
					},
					map[string]any{
						"name": "html_url",
						"title": "Html Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "merged_at",
						"title": "Merged At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "node_id",
						"title": "Node Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "The title of the pull request",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "user",
						"title": "User",
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"repo",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
									"pulls",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "created",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"example": "open",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/repos/{owner}/{repo}/pulls/{pull_number}",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "pull_number",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"owner",
										"repo",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.repo",
						},
					},
				},
			},
			"rate_limit": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "rate",
						"title": "Rate",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "resources",
						"title": "Resources",
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
								"kind": "http",
								"method": "GET",
								"orig": "/rate_limit",
								"segments": []any{
									map[string]any{
										"lit": "rate_limit",
									},
								},
								"parts": []any{
									"rate_limit",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Avatar Url",
						"type": "`$STRING`",
						"short": "URL to the user's avatar image",
						"format": "uri",
					},
					map[string]any{
						"name": "bio",
						"title": "Bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "blog",
						"title": "Blog",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "default_branch",
						"title": "Default Branch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"format": "email",
					},
					map[string]any{
						"name": "followers",
						"title": "Followers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "following",
						"title": "Following",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "fork",
						"title": "Fork",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "forks_count",
						"title": "Forks Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "full_name",
						"title": "Full Name",
						"type": "`$STRING`",
						"short": "The full name including owner",
					},
					map[string]any{
						"name": "github-rest_id",
						"title": "Github Rest Id",
						"type": "`$INTEGER`",
						"short": "The user's unique identifier",
					},
					map[string]any{
						"name": "html_url",
						"title": "Html Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "The user's unique identifier",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "login",
						"title": "Login",
						"type": "`$STRING`",
						"short": "The user's GitHub username",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The name of the repository",
					},
					map[string]any{
						"name": "node_id",
						"title": "Node Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "open_issues_count",
						"title": "Open Issues Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "owner",
						"title": "Owner",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "private",
						"title": "Private",
						"type": "`$BOOLEAN`",
						"short": "Whether the repository is private",
					},
					map[string]any{
						"name": "public_gists",
						"title": "Public Gists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "public_repos",
						"title": "Public Repos",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pushed_at",
						"title": "Pushed At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "size",
						"title": "Size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "stargazers_count",
						"title": "Stargazers Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "visibility",
						"title": "Visibility",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "watchers_count",
						"title": "Watchers Count",
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
								"parts": []any{
									"users",
									"{username}",
									"repos",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "direction",
											"orig": "direction",
											"type": "`$STRING`",
											"kind": "query",
											"example": "asc",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
											"example": "full_name",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "owner",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/orgs/{org}/repos",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "org_id",
											"orig": "org",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "all",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"repos",
									"{owner}",
									"{repo}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.owner`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "repo",
											"orig": "repo",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"owner",
										"repo",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.org",
						},
						[]any{
							"$.main.kit.entity.user",
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
								"parts": []any{
									"search",
									"issues",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
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
								"parts": []any{
									"search",
									"repositories",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "order",
											"orig": "order",
											"type": "`$STRING`",
											"kind": "query",
											"example": "desc",
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
										map[string]any{
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "sort",
											"orig": "sort",
											"type": "`$STRING`",
											"kind": "query",
										},
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
						"title": "Avatar Url",
						"type": "`$STRING`",
						"short": "URL to the user's avatar image",
						"format": "uri",
					},
					map[string]any{
						"name": "bio",
						"title": "Bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "blog",
						"title": "Blog",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"format": "email",
					},
					map[string]any{
						"name": "followers",
						"title": "Followers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "following",
						"title": "Following",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "html_url",
						"title": "Html Url",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The user's unique identifier",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "login",
						"title": "Login",
						"type": "`$STRING`",
						"short": "The user's GitHub username",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "node_id",
						"title": "Node Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "public_gists",
						"title": "Public Gists",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "public_repos",
						"title": "Public Repos",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated_at",
						"title": "Updated At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"format": "uri",
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
								"kind": "http",
								"method": "GET",
								"orig": "/users/{username}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"username": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/user",
								"segments": []any{
									map[string]any{
										"lit": "user",
									},
								},
								"parts": []any{
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
