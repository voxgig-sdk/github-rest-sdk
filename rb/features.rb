# GithubRest SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GithubRestFeatures
  def self.make_feature(name)
    case name
    when "base"
      GithubRestBaseFeature.new
    when "ratelimit"
      GithubRestRatelimitFeature.new
    when "retry"
      GithubRestRetryFeature.new
    when "test"
      GithubRestTestFeature.new
    when "timeout"
      GithubRestTimeoutFeature.new
    else
      GithubRestBaseFeature.new
    end
  end
end
