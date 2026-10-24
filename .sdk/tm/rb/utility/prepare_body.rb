# StarWars SDK utility: prepare_body
require_relative 'media'
module StarWarsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return StarWarsUtilities.raw_body(ctx.reqdata) if StarWarsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
