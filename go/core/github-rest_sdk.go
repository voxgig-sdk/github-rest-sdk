package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/github-rest-sdk/go/utility/struct"
)

type GithubRestSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewGithubRestSDK(options map[string]any) *GithubRestSDK {
	sdk := &GithubRestSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *GithubRestSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *GithubRestSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *GithubRestSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *GithubRestSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *GithubRestSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Branch returns a Branch entity bound to this client.
// Idiomatic usage: client.Branch(nil).List(nil, nil) or
// client.Branch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Branch(data map[string]any) GithubRestEntity {
	return NewBranchEntityFunc(sdk, data)
}


// Commit returns a Commit entity bound to this client.
// Idiomatic usage: client.Commit(nil).List(nil, nil) or
// client.Commit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Commit(data map[string]any) GithubRestEntity {
	return NewCommitEntityFunc(sdk, data)
}


// Gist returns a Gist entity bound to this client.
// Idiomatic usage: client.Gist(nil).List(nil, nil) or
// client.Gist(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Gist(data map[string]any) GithubRestEntity {
	return NewGistEntityFunc(sdk, data)
}


// Issue returns a Issue entity bound to this client.
// Idiomatic usage: client.Issue(nil).List(nil, nil) or
// client.Issue(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Issue(data map[string]any) GithubRestEntity {
	return NewIssueEntityFunc(sdk, data)
}


// Notification returns a Notification entity bound to this client.
// Idiomatic usage: client.Notification(nil).List(nil, nil) or
// client.Notification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Notification(data map[string]any) GithubRestEntity {
	return NewNotificationEntityFunc(sdk, data)
}


// Org returns a Org entity bound to this client.
// Idiomatic usage: client.Org(nil).List(nil, nil) or
// client.Org(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Org(data map[string]any) GithubRestEntity {
	return NewOrgEntityFunc(sdk, data)
}


// Pull returns a Pull entity bound to this client.
// Idiomatic usage: client.Pull(nil).List(nil, nil) or
// client.Pull(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Pull(data map[string]any) GithubRestEntity {
	return NewPullEntityFunc(sdk, data)
}


// RateLimit returns a RateLimit entity bound to this client.
// Idiomatic usage: client.RateLimit(nil).List(nil, nil) or
// client.RateLimit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) RateLimit(data map[string]any) GithubRestEntity {
	return NewRateLimitEntityFunc(sdk, data)
}


// Repo returns a Repo entity bound to this client.
// Idiomatic usage: client.Repo(nil).List(nil, nil) or
// client.Repo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Repo(data map[string]any) GithubRestEntity {
	return NewRepoEntityFunc(sdk, data)
}


// Search returns a Search entity bound to this client.
// Idiomatic usage: client.Search(nil).List(nil, nil) or
// client.Search(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) Search(data map[string]any) GithubRestEntity {
	return NewSearchEntityFunc(sdk, data)
}


// User returns a User entity bound to this client.
// Idiomatic usage: client.User(nil).List(nil, nil) or
// client.User(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *GithubRestSDK) User(data map[string]any) GithubRestEntity {
	return NewUserEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *GithubRestSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewGithubRestSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
