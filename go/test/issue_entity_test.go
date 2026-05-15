package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestIssueEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Issue(nil)
		if ent == nil {
			t.Fatal("expected non-nil IssueEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := issueBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "issue." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set GITHUBREST_TEST_ISSUE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		issueRef01Ent := client.Issue(nil)
		issueRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "issue"}, setup.data), "issue_ref01"))
		issueRef01Data["owner"] = setup.idmap["owner01"]
		issueRef01Data["repo"] = setup.idmap["repo01"]

		issueRef01DataResult, err := issueRef01Ent.Create(issueRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		issueRef01Data = core.ToMapAny(issueRef01DataResult)
		if issueRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if issueRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		issueRef01Match := map[string]any{
			"owner": setup.idmap["owner01"],
			"repo": setup.idmap["repo01"],
		}

		issueRef01ListResult, err := issueRef01Ent.List(issueRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		issueRef01List, issueRef01ListOk := issueRef01ListResult.([]any)
		if !issueRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", issueRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(issueRef01List), map[string]any{"id": issueRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		issueRef01DataUp0Up := map[string]any{
			"id": issueRef01Data["id"],
			"owner": setup.idmap["owner"],
			"repo": setup.idmap["repo"],
		}

		issueRef01MarkdefUp0Name := "body"
		issueRef01MarkdefUp0Value := fmt.Sprintf("Mark01-issue_ref01_%d", setup.now)
		issueRef01DataUp0Up[issueRef01MarkdefUp0Name] = issueRef01MarkdefUp0Value

		issueRef01ResdataUp0Result, err := issueRef01Ent.Update(issueRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		issueRef01ResdataUp0 := core.ToMapAny(issueRef01ResdataUp0Result)
		if issueRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if issueRef01ResdataUp0["id"] != issueRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if issueRef01ResdataUp0[issueRef01MarkdefUp0Name] != issueRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", issueRef01MarkdefUp0Name, issueRef01ResdataUp0[issueRef01MarkdefUp0Name])
		}

		// LOAD
		issueRef01MatchDt0 := map[string]any{
			"id": issueRef01Data["id"],
		}
		issueRef01DataDt0Loaded, err := issueRef01Ent.Load(issueRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		issueRef01DataDt0LoadResult := core.ToMapAny(issueRef01DataDt0Loaded)
		if issueRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if issueRef01DataDt0LoadResult["id"] != issueRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func issueBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "issue", "IssueTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read issue test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse issue test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"issue01", "issue02", "issue03", "repo01", "repo02", "repo03", "owner01"},
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
	entidEnvRaw := os.Getenv("GITHUBREST_TEST_ISSUE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GITHUBREST_TEST_ISSUE_ENTID": idmap,
		"GITHUBREST_TEST_LIVE":      "FALSE",
		"GITHUBREST_TEST_EXPLAIN":   "FALSE",
		"GITHUBREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GITHUBREST_TEST_ISSUE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add owner alias for update test.
	if idmapResolved["owner"] == nil {
		idmapResolved["owner"] = idmapResolved["owner01"]
	}
	// Add repo alias for update test.
	if idmapResolved["repo"] == nil {
		idmapResolved["repo"] = idmapResolved["repo01"]
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
