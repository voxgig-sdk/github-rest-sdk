# GithubRest SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GithubRestFeatures
  def self.make_feature(name)
    case name
    when "base"
      GithubRestBaseFeature.new
    when "test"
      GithubRestTestFeature.new
    else
      GithubRestBaseFeature.new
    end
  end
end
