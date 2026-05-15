# GithubRest SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GithubRestUtility.registrar = ->(u) {
  u.clean = GithubRestUtilities::Clean
  u.done = GithubRestUtilities::Done
  u.make_error = GithubRestUtilities::MakeError
  u.feature_add = GithubRestUtilities::FeatureAdd
  u.feature_hook = GithubRestUtilities::FeatureHook
  u.feature_init = GithubRestUtilities::FeatureInit
  u.fetcher = GithubRestUtilities::Fetcher
  u.make_fetch_def = GithubRestUtilities::MakeFetchDef
  u.make_context = GithubRestUtilities::MakeContext
  u.make_options = GithubRestUtilities::MakeOptions
  u.make_request = GithubRestUtilities::MakeRequest
  u.make_response = GithubRestUtilities::MakeResponse
  u.make_result = GithubRestUtilities::MakeResult
  u.make_point = GithubRestUtilities::MakePoint
  u.make_spec = GithubRestUtilities::MakeSpec
  u.make_url = GithubRestUtilities::MakeUrl
  u.param = GithubRestUtilities::Param
  u.prepare_auth = GithubRestUtilities::PrepareAuth
  u.prepare_body = GithubRestUtilities::PrepareBody
  u.prepare_headers = GithubRestUtilities::PrepareHeaders
  u.prepare_method = GithubRestUtilities::PrepareMethod
  u.prepare_params = GithubRestUtilities::PrepareParams
  u.prepare_path = GithubRestUtilities::PreparePath
  u.prepare_query = GithubRestUtilities::PrepareQuery
  u.result_basic = GithubRestUtilities::ResultBasic
  u.result_body = GithubRestUtilities::ResultBody
  u.result_headers = GithubRestUtilities::ResultHeaders
  u.transform_request = GithubRestUtilities::TransformRequest
  u.transform_response = GithubRestUtilities::TransformResponse
}
