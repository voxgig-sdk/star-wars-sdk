# StarWars SDK utility: feature_add
module StarWarsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
