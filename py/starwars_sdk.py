# StarWars SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import StarWarsUtility
from core.spec import StarWarsSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import StarWarsBaseFeature
from features import _make_feature


class StarWarsSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = StarWarsUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return StarWarsUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = StarWarsSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def film(self):
        """Idiomatic facade: client.film.list() / client.film.load({"id": ...})."""
        from entity.film_entity import FilmEntity
        cached = getattr(self, "_film", None)
        if cached is None:
            cached = FilmEntity(self, None)
            self._film = cached
        return cached

    def Film(self, data=None):
        # Deprecated: use client.film instead.
        from entity.film_entity import FilmEntity
        return FilmEntity(self, data)


    @property
    def people_list(self):
        """Idiomatic facade: client.people_list.list() / client.people_list.load({"id": ...})."""
        from entity.people_list_entity import PeopleListEntity
        cached = getattr(self, "_people_list", None)
        if cached is None:
            cached = PeopleListEntity(self, None)
            self._people_list = cached
        return cached

    def PeopleList(self, data=None):
        # Deprecated: use client.people_list instead.
        from entity.people_list_entity import PeopleListEntity
        return PeopleListEntity(self, data)


    @property
    def person(self):
        """Idiomatic facade: client.person.list() / client.person.load({"id": ...})."""
        from entity.person_entity import PersonEntity
        cached = getattr(self, "_person", None)
        if cached is None:
            cached = PersonEntity(self, None)
            self._person = cached
        return cached

    def Person(self, data=None):
        # Deprecated: use client.person instead.
        from entity.person_entity import PersonEntity
        return PersonEntity(self, data)


    @property
    def planet(self):
        """Idiomatic facade: client.planet.list() / client.planet.load({"id": ...})."""
        from entity.planet_entity import PlanetEntity
        cached = getattr(self, "_planet", None)
        if cached is None:
            cached = PlanetEntity(self, None)
            self._planet = cached
        return cached

    def Planet(self, data=None):
        # Deprecated: use client.planet instead.
        from entity.planet_entity import PlanetEntity
        return PlanetEntity(self, data)


    @property
    def species(self):
        """Idiomatic facade: client.species.list() / client.species.load({"id": ...})."""
        from entity.species_entity import SpeciesEntity
        cached = getattr(self, "_species", None)
        if cached is None:
            cached = SpeciesEntity(self, None)
            self._species = cached
        return cached

    def Species(self, data=None):
        # Deprecated: use client.species instead.
        from entity.species_entity import SpeciesEntity
        return SpeciesEntity(self, data)


    @property
    def starship(self):
        """Idiomatic facade: client.starship.list() / client.starship.load({"id": ...})."""
        from entity.starship_entity import StarshipEntity
        cached = getattr(self, "_starship", None)
        if cached is None:
            cached = StarshipEntity(self, None)
            self._starship = cached
        return cached

    def Starship(self, data=None):
        # Deprecated: use client.starship instead.
        from entity.starship_entity import StarshipEntity
        return StarshipEntity(self, data)


    @property
    def vehicle(self):
        """Idiomatic facade: client.vehicle.list() / client.vehicle.load({"id": ...})."""
        from entity.vehicle_entity import VehicleEntity
        cached = getattr(self, "_vehicle", None)
        if cached is None:
            cached = VehicleEntity(self, None)
            self._vehicle = cached
        return cached

    def Vehicle(self, data=None):
        # Deprecated: use client.vehicle instead.
        from entity.vehicle_entity import VehicleEntity
        return VehicleEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
