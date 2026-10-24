package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/github-rest-sdk/go"
	"github.com/voxgig-sdk/github-rest-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const repoDirectLiveStrict = true

func TestRepoDirect(t *testing.T) {
	t.Run("direct-list-repo", func(t *testing.T) {
		setup := repoDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-repo", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"org01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, repoDirectLiveStrict, "Live test blocked: needs %s via GITHUB_REST_TEST_REPO_ENTID", _liveKey)
					return
				}
			}
		}
		client := setup.client

		params := map[string]any{}
		if setup.live {
			params["org_id"] = setup.idmap["org01"]
		} else {
			params["org_id"] = "direct01"
		}

		result, err := client.Direct(map[string]any{
			"path":   "orgs/{org_id}/repos",
			"method": "GET",
			"params": params,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, repoDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, repoDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, repoDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
			}
		}
	})

	t.Run("direct-load-repo", func(t *testing.T) {
		setup := repoDirectSetup(map[string]any{"id": "direct01"})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-load-repo", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"org01", "owner01", "repo01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, repoDirectLiveStrict, "Live test blocked: needs %s via GITHUB_REST_TEST_REPO_ENTID", _liveKey)
					return
				}
			}
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			listParams := map[string]any{}
			listParams["org_id"] = setup.idmap["org01"]
			listResult, listErr := client.Direct(map[string]any{
				"path":   "orgs/{org_id}/repos",
				"method": "GET",
				"params": listParams,
			})
			if listErr != nil {
				liveMiss(t, repoDirectLiveStrict, "Live list discovery failed: %v", listErr)
			}
			if listResult["ok"] != true {
				liveMiss(t, repoDirectLiveStrict, "Live list discovery failed: %s", liveDescribe(listResult))
			}
			listData, listOk := liveList(listResult["data"])
			if !listOk {
				liveMiss(t, repoDirectLiveStrict, "Live list discovery returned no list: %s", liveDescribe(listResult))
			}
			if len(listData) == 0 {
				liveEmpty(t, "The account has no repo record to load")
			}
			firstEnt := core.ToMapAny(listData[0])
			if firstEnt["id"] == nil {
				liveMiss(t, repoDirectLiveStrict, "Live load blocked: discovery returned no usable identity")
			}
			params["id"] = firstEnt["id"]
			params["owner"] = setup.idmap["owner01"]
			params["repo"] = setup.idmap["repo01"]
		} else {
			params["owner"] = "direct01"
			params["repo"] = "direct02"
		}

		result, err := client.Direct(map[string]any{
			"path":   "repos/{owner}/{repo}",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, repoDirectLiveStrict, "Live load failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, repoDirectLiveStrict, "Live load failed: %s", liveDescribe(result))
			}
			if result["data"] == nil {
				liveMiss(t, repoDirectLiveStrict, "Live load returned no data: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
			if result["data"] == nil {
				t.Fatal("expected data to be non-nil")
			}
		}

		if !setup.live {
			if dataMap, ok := result["data"].(map[string]any); ok {
				if dataMap["id"] != "direct01" {
					t.Fatalf("expected data.id to be direct01, got %v", dataMap["id"])
				}
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
			}
		}
	})

}

type repoDirectSetupResult struct {
	client *sdk.GithubRestSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func repoDirectSetup(mockres any) *repoDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"GITHUB_REST_TEST_REPO_ENTID": map[string]any{},
		"GITHUB_REST_TEST_LIVE":    "FALSE",
		"GITHUB_REST_APIKEY":       "",
	})

	live := env["GITHUB_REST_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
			"apikey": env["GITHUB_REST_APIKEY"],
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewGithubRestSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["GITHUB_REST_TEST_REPO_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &repoDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewGithubRestSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &repoDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
