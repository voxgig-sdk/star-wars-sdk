# StarWars SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module StarWarsFeatures
  def self.make_feature(name)
    case name
    when "base"
      StarWarsBaseFeature.new
    when "test"
      StarWarsTestFeature.new
    else
      StarWarsBaseFeature.new
    end
  end
end
