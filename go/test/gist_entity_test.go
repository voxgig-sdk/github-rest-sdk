package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/github-rest-sdk"
	"github.com/voxgig-sdk/github-rest-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGistEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Gist(nil)
		if ent == nil {
			t.Fatal("expected non-nil GistEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := gistBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "gist." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_GIST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		gistRef01Ent := client.Gist(nil)
		gistRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "gist"}, setup.data), "gist_ref01"))

		gistRef01DataResult, err := gistRef01Ent.Create(gistRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		gistRef01Data = core.ToMapAny(gistRef01DataResult)
		if gistRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if gistRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		gistRef01Match := map[string]any{}

		gistRef01ListResult, err := gistRef01Ent.List(gistRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		gistRef01List, gistRef01ListOk := gistRef01ListResult.([]any)
		if !gistRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", gistRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(gistRef01List), map[string]any{"id": gistRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func gistBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "gist", "GistTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read gist test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse gist test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"gist01", "gist02", "gist03"},
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
	entidEnvRaw := os.Getenv("GITHUBREST_TEST_GIST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GITHUBREST_TEST_GIST_ENTID": idmap,
		"GITHUBREST_TEST_LIVE":      "FALSE",
		"GITHUBREST_TEST_EXPLAIN":   "FALSE",
		"GITHUBREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GITHUBREST_TEST_GIST_ENTID"])
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
