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

func TestPullEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Pull(nil)
		if ent == nil {
			t.Fatal("expected non-nil PullEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_PULL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		pullRef01Ent := client.Pull(nil)
		pullRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "pull"}, setup.data), "pull_ref01"))
		pullRef01Data["owner"] = setup.idmap["owner01"]
		pullRef01Data["repo"] = setup.idmap["repo01"]

		pullRef01DataResult, err := pullRef01Ent.Create(pullRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		pullRef01Data = core.ToMapAny(pullRef01DataResult)
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
		pullRef01DataDt0Loaded, err := pullRef01Ent.Load(pullRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		pullRef01DataDt0LoadResult := core.ToMapAny(pullRef01DataDt0Loaded)
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
	idmap := vs.Transform(
		[]any{"pull01", "pull02", "pull03", "repo01", "repo02", "repo03", "owner01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GITHUBREST_TEST_PULL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GITHUBREST_TEST_PULL_ENTID": idmap,
		"GITHUBREST_TEST_LIVE":      "FALSE",
		"GITHUBREST_TEST_EXPLAIN":   "FALSE",
		"GITHUBREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GITHUBREST_TEST_PULL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GITHUBREST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GITHUBREST_APIKEY"],
			},
			extra,
		})
		client = sdk.NewGithubRestSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GITHUBREST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GITHUBREST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
