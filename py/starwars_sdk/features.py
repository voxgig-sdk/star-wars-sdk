# StarWars SDK feature factory

from starwars_sdk.feature.base_feature import StarWarsBaseFeature
from starwars_sdk.feature.test_feature import StarWarsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: StarWarsBaseFeature(),
        "test": lambda: StarWarsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
