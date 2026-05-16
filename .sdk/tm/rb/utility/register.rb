# StarWars SDK utility registration
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

StarWarsUtility.registrar = ->(u) {
  u.clean = StarWarsUtilities::Clean
  u.done = StarWarsUtilities::Done
  u.make_error = StarWarsUtilities::MakeError
  u.feature_add = StarWarsUtilities::FeatureAdd
  u.feature_hook = StarWarsUtilities::FeatureHook
  u.feature_init = StarWarsUtilities::FeatureInit
  u.fetcher = StarWarsUtilities::Fetcher
  u.make_fetch_def = StarWarsUtilities::MakeFetchDef
  u.make_context = StarWarsUtilities::MakeContext
  u.make_options = StarWarsUtilities::MakeOptions
  u.make_request = StarWarsUtilities::MakeRequest
  u.make_response = StarWarsUtilities::MakeResponse
  u.make_result = StarWarsUtilities::MakeResult
  u.make_point = StarWarsUtilities::MakePoint
  u.make_spec = StarWarsUtilities::MakeSpec
  u.make_url = StarWarsUtilities::MakeUrl
  u.param = StarWarsUtilities::Param
  u.prepare_auth = StarWarsUtilities::PrepareAuth
  u.prepare_body = StarWarsUtilities::PrepareBody
  u.prepare_headers = StarWarsUtilities::PrepareHeaders
  u.prepare_method = StarWarsUtilities::PrepareMethod
  u.prepare_params = StarWarsUtilities::PrepareParams
  u.prepare_path = StarWarsUtilities::PreparePath
  u.prepare_query = StarWarsUtilities::PrepareQuery
  u.result_basic = StarWarsUtilities::ResultBasic
  u.result_body = StarWarsUtilities::ResultBody
  u.result_headers = StarWarsUtilities::ResultHeaders
  u.transform_request = StarWarsUtilities::TransformRequest
  u.transform_response = StarWarsUtilities::TransformResponse
}
