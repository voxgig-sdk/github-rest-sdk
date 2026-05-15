# GithubRest SDK utility: make_context

from core.context import GithubRestContext


def make_context_util(ctxmap, basectx):
    return GithubRestContext(ctxmap, basectx)
