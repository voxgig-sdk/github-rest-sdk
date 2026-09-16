# GithubRest SDK feature factory

from githubrest_sdk.feature.base_feature import GithubRestBaseFeature
from githubrest_sdk.feature.ratelimit_feature import GithubRestRatelimitFeature
from githubrest_sdk.feature.retry_feature import GithubRestRetryFeature
from githubrest_sdk.feature.test_feature import GithubRestTestFeature
from githubrest_sdk.feature.timeout_feature import GithubRestTimeoutFeature


_FEATURES = {
    "base": lambda: GithubRestBaseFeature(),
    "ratelimit": lambda: GithubRestRatelimitFeature(),
    "retry": lambda: GithubRestRetryFeature(),
    "test": lambda: GithubRestTestFeature(),
    "timeout": lambda: GithubRestTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
