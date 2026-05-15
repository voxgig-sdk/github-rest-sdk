# GithubRest SDK utility: feature_add
module GithubRestUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
