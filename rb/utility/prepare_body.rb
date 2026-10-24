# GithubRest SDK utility: prepare_body
require_relative 'media'
module GithubRestUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return GithubRestUtilities.raw_body(ctx.reqdata) if GithubRestUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
