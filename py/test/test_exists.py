# ProjectName SDK exists test

import pytest
from githubrest_sdk import GithubRestSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GithubRestSDK.test(None, None)
        assert testsdk is not None
