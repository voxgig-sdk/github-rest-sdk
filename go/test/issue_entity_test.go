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

	sdk "github.com/voxgig-sdk/github-rest-sdk/go"
	"github.com/voxgig-sdk/github-rest-sdk/go/core"

	vs "github.com/voxgig-sdk/github-rest-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const issueEntityLiveStrict = true


func TestIssueEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Issue(nil)
		if ent == nil {
			t.Fatal("expected non-nil IssueEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Issue(nil).List(map[string]any{"owner": 1, "repo": "x"}, nil)
		if sdkerr, ok := err.(*core.GithubRestError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
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
		if setup.live {
			for _, _liveKey := range []string{"owner01", "repo01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, issueEntityLiveStrict, "Live entity test blocked: needs %s via GITHUB_REST_TEST_ISSUE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// CREATE
		issueRef01Ent := client.Issue(nil)
		issueRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "issue"}), "issue_ref01"))
		issueRef01Data["owner"] = setup.idmap["owner01"]
		issueRef01Data["repo"] = setup.idmap["repo01"]

		issueRef01DataResult, err := issueRef01Ent.Create(issueRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		issueRef01Data = core.ToMapAny(entityData(issueRef01DataResult))
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
		issueRef01ResdataUp0 := core.ToMapAny(entityData(issueRef01ResdataUp0Result))
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
		if v := setup.idmap["owner"]; v != nil {
			issueRef01MatchDt0["owner"] = v
		} else {
			issueRef01MatchDt0["owner"] = setup.idmap["owner01"]
		}
		if v := setup.idmap["repo"]; v != nil {
			issueRef01MatchDt0["repo"] = v
		} else {
			issueRef01MatchDt0["repo"] = setup.idmap["repo01"]
		}
		issueRef01DataDt0Loaded, err := issueRef01Ent.Load(issueRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		issueRef01DataDt0LoadResult := core.ToMapAny(entityData(issueRef01DataDt0Loaded))
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
	idmap, _ := vs.Transform(
		[]any{"issue01", "issue02", "issue03", "repo01", "repo02", "repo03", "owner01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("GITHUB_REST_TEST_ISSUE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GITHUB_REST_TEST_ISSUE_ENTID": idmap,
		"GITHUB_REST_TEST_LIVE":      "FALSE",
		"GITHUB_REST_TEST_EXPLAIN":   "FALSE",
		"GITHUB_REST_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["GITHUB_REST_TEST_ISSUE_ENTID"])
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
