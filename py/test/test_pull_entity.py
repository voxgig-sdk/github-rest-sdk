# Pull entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from githubrest_sdk import GithubRestSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPullEntity:

    def test_should_create_instance(self):
        testsdk = GithubRestSDK.test(None, None)
        ent = testsdk.Pull(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _pull_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "pull." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set GITHUBREST_TEST_PULL_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        pull_ref01_ent = client.Pull(None)
        pull_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.pull"), "pull_ref01"))
        pull_ref01_data["owner"] = setup["idmap"]["owner01"]
        pull_ref01_data["repo"] = setup["idmap"]["repo01"]

        pull_ref01_data = helpers.to_map(pull_ref01_ent.create(pull_ref01_data, None))
        assert pull_ref01_data is not None
        assert pull_ref01_data["id"] is not None

        # LIST
        pull_ref01_match = {
            "owner": setup["idmap"]["owner01"],
            "repo": setup["idmap"]["repo01"],
        }

        pull_ref01_list_result = pull_ref01_ent.list(pull_ref01_match, None)
        assert isinstance(pull_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(pull_ref01_list_result),
            {"id": pull_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        pull_ref01_match_dt0 = {
            "id": pull_ref01_data["id"],
        }
        pull_ref01_data_dt0_loaded = pull_ref01_ent.load(pull_ref01_match_dt0, None)
        pull_ref01_data_dt0_load_result = helpers.to_map(pull_ref01_data_dt0_loaded)
        assert pull_ref01_data_dt0_load_result is not None
        assert pull_ref01_data_dt0_load_result["id"] == pull_ref01_data["id"]



def _pull_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/pull/PullTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = GithubRestSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["pull01", "pull02", "pull03", "repo01", "repo02", "repo03", "owner01"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "GITHUBREST_TEST_PULL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "GITHUBREST_TEST_PULL_ENTID": idmap,
        "GITHUBREST_TEST_LIVE": "FALSE",
        "GITHUBREST_TEST_EXPLAIN": "FALSE",
        "GITHUBREST_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("GITHUBREST_TEST_PULL_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("GITHUBREST_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("GITHUBREST_APIKEY"),
            },
            extra or {},
        ])
        client = GithubRestSDK(helpers.to_map(merged_opts))

    _live = env.get("GITHUBREST_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("GITHUBREST_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
