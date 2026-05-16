# StarWars SDK utility: make_context
require_relative '../core/context'
module StarWarsUtilities
  MakeContext = ->(ctxmap, basectx) {
    StarWarsContext.new(ctxmap, basectx)
  }
end
