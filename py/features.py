# GithubRest SDK feature factory

from feature.base_feature import GithubRestBaseFeature
from feature.test_feature import GithubRestTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GithubRestBaseFeature(),
        "test": lambda: GithubRestTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
