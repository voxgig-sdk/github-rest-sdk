# Branch entity test

import json
import os
import time

import pytest

from githubrest_sdk.utility.voxgig_struct import voxgig_struct as vs
from githubrest_sdk import GithubRestSDK
from githubrest_sdk.core import helpers
from githubrest_sdk.config import shared_config
from githubrest_sdk.feature.base_feature import GithubRestBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestBranchEntity:

    def test_should_create_instance(self):
        testsdk = GithubRestSDK.test(None, None)
        ent = testsdk.Branch(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = GithubRestSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Branch(None).list({"owner": 1, "repo": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _branch_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "branch." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["owner01", "repo01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via GITHUB_REST_TEST_BRANCH_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        branch_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.branch")))
        branch_ref01_data = None
        if len(branch_ref01_data_raw) > 0:
            branch_ref01_data = helpers.to_map(branch_ref01_data_raw[0][1])

        # LIST
        branch_ref01_ent = client.Branch(None)
        branch_ref01_match = {
            "owner": setup["idmap"]["owner01"],
            "repo": setup["idmap"]["repo01"],
        }

        branch_ref01_list_result = branch_ref01_ent.list(branch_ref01_match, None)
        assert isinstance(branch_ref01_list_result, list)



def _branch_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/branch/BranchTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GithubRestSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["branch01", "branch02", "branch03", "repo01", "repo02", "repo03", "owner01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "GITHUB_REST_TEST_BRANCH_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GITHUB_REST_TEST_BRANCH_ENTID": idmap,
        "GITHUB_REST_TEST_LIVE": "FALSE",
        "GITHUB_REST_TEST_EXPLAIN": "FALSE",
        "GITHUB_REST_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("GITHUB_REST_TEST_BRANCH_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("GITHUB_REST_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("GITHUB_REST_APIKEY"),
            },
            extra or {},
        ])
        client = GithubRestSDK(helpers.to_map(merged_opts))

    _live = env.get("GITHUB_REST_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("GITHUB_REST_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
