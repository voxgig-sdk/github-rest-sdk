package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/github-rest-sdk/go"
	"github.com/voxgig-sdk/github-rest-sdk/go/core"

	vs "github.com/voxgig-sdk/github-rest-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const pullEntityLiveStrict = true


func TestPullEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Pull(nil)
		if ent == nil {
			t.Fatal("expected non-nil PullEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Pull(nil).List(map[string]any{"owner": 1, "repo": "x"}, nil)
		if sdkerr, ok := err.(*core.GithubRestError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := pullBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "pull." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"owner01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, pullEntityLiveStrict, "Live entity test blocked: needs %s via GITHUB_REST_TEST_PULL_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		pullRef01Ent := client.Pull(nil)
		pullRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "pull"}), "pull_ref01"))
		pullRef01Data["owner"] = setup.idmap["owner01"]
		pullRef01Data["repo"] = setup.idmap["repo01"]

		pullRef01DataResult, err := pullRef01Ent.Create(pullRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		pullRef01Data = core.ToMapAny(entityData(pullRef01DataResult))
		if pullRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if pullRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		pullRef01Match := map[string]any{
			"owner": setup.idmap["owner01"],
			"repo": setup.idmap["repo01"],
		}

		pullRef01ListResult, err := pullRef01Ent.List(pullRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		pullRef01List, pullRef01ListOk := pullRef01ListResult.([]any)
		if !pullRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", pullRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(pullRef01List), map[string]any{"id": pullRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		pullRef01MatchDt0 := map[string]any{
			"id": pullRef01Data["id"],
		}
		if v := setup.idmap["owner"]; v != nil {
			pullRef01MatchDt0["owner"] = v
		} else {
			pullRef01MatchDt0["owner"] = setup.idmap["owner01"]
		}
		if v := setup.idmap["repo"]; v != nil {
			pullRef01MatchDt0["repo"] = v
		} else {
			pullRef01MatchDt0["repo"] = setup.idmap["repo01"]
		}
		pullRef01DataDt0Loaded, err := pullRef01Ent.Load(pullRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		pullRef01DataDt0LoadResult := core.ToMapAny(entityData(pullRef01DataDt0Loaded))
		if pullRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if pullRef01DataDt0LoadResult["id"] != pullRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func pullBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "pull", "PullTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read pull test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse pull test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"pull01", "pull02", "pull03", "repo01", "repo02", "repo03", "owner01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GITHUB_REST_TEST_PULL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GITHUB_REST_TEST_PULL_ENTID": idmap,
		"GITHUB_REST_TEST_LIVE":      "FALSE",
		"GITHUB_REST_TEST_EXPLAIN":   "FALSE",
		"GITHUB_REST_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GITHUB_REST_TEST_PULL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GITHUB_REST_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["GITHUB_REST_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewGithubRestSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GITHUB_REST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GITHUB_REST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
