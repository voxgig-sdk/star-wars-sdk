# StarWars SDK utility: make_context

from starwars_sdk.core.context import StarWarsContext


def make_context_util(ctxmap, basectx):
    return StarWarsContext(ctxmap, basectx)
