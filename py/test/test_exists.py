# ProjectName SDK exists test

import pytest
from starwars_sdk import StarWarsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = StarWarsSDK.test(None, None)
        assert testsdk is not None
