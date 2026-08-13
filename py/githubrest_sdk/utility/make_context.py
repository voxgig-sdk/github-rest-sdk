# GithubRest SDK utility: make_context

from githubrest_sdk.core.context import GithubRestContext


def make_context_util(ctxmap, basectx):
    return GithubRestContext(ctxmap, basectx)
