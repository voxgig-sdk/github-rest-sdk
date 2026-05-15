# GithubRest SDK utility: make_context
require_relative '../core/context'
module GithubRestUtilities
  MakeContext = ->(ctxmap, basectx) {
    GithubRestContext.new(ctxmap, basectx)
  }
end
