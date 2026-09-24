"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PlanetEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STAR_WARS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StarWarsSDK.test();
        const ent = testsdk.Planet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'planet.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "climate": { "a": true, "h": "Climate", "n": "climate", "r": false, "sh": "The climate of this planet", "t": "`$STRING`", "key$": "climate", "index$": 0 }, "created": { "a": true, "fo": "date-time", "h": "Created", "n": "created", "r": false, "sh": "The ISO 8601 date format of the time that this resource was created", "t": "`$STRING`", "key$": "created", "index$": 1 }, "diameter": { "a": true, "h": "Diameter", "n": "diameter", "r": false, "sh": "The diameter of this planet in kilometers", "t": "`$STRING`", "key$": "diameter", "index$": 2 }, "edited": { "a": true, "fo": "date-time", "h": "Edited", "n": "edited", "r": false, "sh": "The ISO 8601 date format of the time that this resource was edited", "t": "`$STRING`", "key$": "edited", "index$": 3 }, "films": { "a": true, "h": "Films", "n": "films", "r": false, "sh": "An array of Film URL Resources that this planet has appeared in", "t": "`$ARRAY`", "key$": "films", "index$": 4 }, "gravity": { "a": true, "h": "Gravity", "n": "gravity", "r": false, "sh": "A number denoting the gravity of this planet", "t": "`$STRING`", "key$": "gravity", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of this planet", "t": "`$STRING`", "key$": "name", "index$": 7 }, "orbital_period": { "a": true, "h": "Orbital Period", "n": "orbital_period", "r": false, "sh": "The number of standard days it takes for this planet to complete a single orbit of its local star", "t": "`$STRING`", "key$": "orbital_period", "index$": 8 }, "population": { "a": true, "h": "Population", "n": "population", "r": false, "sh": "The average population of sentient beings inhabiting this planet", "t": "`$STRING`", "key$": "population", "index$": 9 }, "residents": { "a": true, "h": "Residents", "n": "residents", "r": false, "sh": "An array of People URL Resources that live on this planet", "t": "`$ARRAY`", "key$": "residents", "index$": 10 }, "rotation_period": { "a": true, "h": "Rotation Period", "n": "rotation_period", "r": false, "sh": "The number of standard hours it takes for this planet to complete a single rotation on its axis", "t": "`$STRING`", "key$": "rotation_period", "index$": 11 }, "surface_water": { "a": true, "h": "Surface Water", "n": "surface_water", "r": false, "sh": "The percentage of the planet surface that is naturally occurring water", "t": "`$STRING`", "key$": "surface_water", "index$": 12 }, "terrain": { "a": true, "h": "Terrain", "n": "terrain", "r": false, "sh": "The terrain of this planet", "t": "`$STRING`", "key$": "terrain", "index$": 13 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "The hypermedia URL of this resource", "t": "`$STRING`", "key$": "url", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "planet", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /planets", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/planets", "q": { "exist": ["page", "search"] }, "r": {}, "s": [{ "lit": "planets" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /planets/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/planets/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "planets" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "planet", "name__orig": "planet", "Name": "Planet", "name_": "planet", "name-": "planet", "NAME": "PLANET", "index$": 2 }, { "active": true, "entity": "planet", "key$": "BasicPlanetFlow", "kind": "basic", "name": "BasicPlanetFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "planet_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "planet_ref01", "srcdatavar": "planet_ref01_data", "suffix": "_dt0" }, "m": { "id": "planet01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-planet_ref01" } }], "index$": 1 }] }, 'Planet', { "GET /planets": { "protocol": "http", "operationId": "getAllPlanets", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "count": { "description": "The total number of planets", "key$": "count", "type": "integer" }, "next": { "description": "The URL for the next page of results", "key$": "next", "nullable": true, "type": "string" }, "previous": { "description": "The URL for the previous page of results", "key$": "previous", "nullable": true, "type": "string" }, "results": { "items": { "properties": { "climate": { "description": "The climate of this planet", "type": "string", "key$": "climate" }, "created": { "description": "The ISO 8601 date format of the time that this resource was created", "format": "date-time", "type": "string", "key$": "created" }, "diameter": { "description": "The diameter of this planet in kilometers", "type": "string", "key$": "diameter" }, "edited": { "description": "The ISO 8601 date format of the time that this resource was edited", "format": "date-time", "type": "string", "key$": "edited" }, "films": { "description": "An array of Film URL Resources that this planet has appeared in", "items": { "type": "string" }, "type": "array", "key$": "films" }, "gravity": { "description": "A number denoting the gravity of this planet", "type": "string", "key$": "gravity" }, "name": { "description": "The name of this planet", "type": "string", "key$": "name" }, "orbital_period": { "description": "The number of standard days it takes for this planet to complete a single orbit of its local star", "type": "string", "key$": "orbital_period" }, "population": { "description": "The average population of sentient beings inhabiting this planet", "type": "string", "key$": "population" }, "residents": { "description": "An array of People URL Resources that live on this planet", "items": { "type": "string" }, "type": "array", "key$": "residents" }, "rotation_period": { "description": "The number of standard hours it takes for this planet to complete a single rotation on its axis", "type": "string", "key$": "rotation_period" }, "surface_water": { "description": "The percentage of the planet surface that is naturally occurring water", "type": "string", "key$": "surface_water" }, "terrain": { "description": "The terrain of this planet", "type": "string", "key$": "terrain" }, "url": { "description": "The hypermedia URL of this resource", "type": "string", "key$": "url" } }, "type": "object", "x-ref": "#/components/schemas/Planet", "index$": 0 }, "key$": "results", "type": "array" } }, "x-ref": "#/components/schemas/PlanetList" } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "schema": { "type": "integer", "default": 1 }, "index$": 0 }, { "name": "search", "in": "query", "description": "Search query to filter planets by name", "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" }, "GET /planets/{id}": { "protocol": "http", "operationId": "getPlanetById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "description": "The name of this planet", "type": "string", "key$": "name" }, "rotation_period": { "description": "The number of standard hours it takes for this planet to complete a single rotation on its axis", "type": "string", "key$": "rotation_period" }, "orbital_period": { "description": "The number of standard days it takes for this planet to complete a single orbit of its local star", "type": "string", "key$": "orbital_period" }, "diameter": { "description": "The diameter of this planet in kilometers", "type": "string", "key$": "diameter" }, "climate": { "description": "The climate of this planet", "type": "string", "key$": "climate" }, "gravity": { "description": "A number denoting the gravity of this planet", "type": "string", "key$": "gravity" }, "terrain": { "description": "The terrain of this planet", "type": "string", "key$": "terrain" }, "surface_water": { "description": "The percentage of the planet surface that is naturally occurring water", "type": "string", "key$": "surface_water" }, "population": { "description": "The average population of sentient beings inhabiting this planet", "type": "string", "key$": "population" }, "residents": { "description": "An array of People URL Resources that live on this planet", "items": { "type": "string" }, "type": "array", "key$": "residents" }, "films": { "description": "An array of Film URL Resources that this planet has appeared in", "items": { "type": "string" }, "type": "array", "key$": "films" }, "created": { "description": "The ISO 8601 date format of the time that this resource was created", "format": "date-time", "type": "string", "key$": "created" }, "edited": { "description": "The ISO 8601 date format of the time that this resource was edited", "format": "date-time", "type": "string", "key$": "edited" }, "url": { "description": "The hypermedia URL of this resource", "type": "string", "key$": "url" } }, "x-ref": "#/components/schemas/Planet", "index$": 0 } } } }, "404": { "description": "Planet not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the planet to retrieve", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let planet_ref01_data = Object.values(setup.data.existing.planet)[0];
        // LIST
        const planet_ref01_ent = client.Planet();
        const planet_ref01_match = {};
        const planet_ref01_list = (await planet_ref01_ent.list(planet_ref01_match)).map((e) => e.data());
        // LOAD
        const planet_ref01_match_dt0 = {};
        planet_ref01_match_dt0.id = planet_ref01_data.id;
        const planet_ref01_data_dt0 = (await planet_ref01_ent.load(planet_ref01_match_dt0)).data();
        (0, node_assert_1.default)(planet_ref01_data_dt0.id === planet_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/planet/PlanetTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StarWarsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['planet01', 'planet02', 'planet03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STAR_WARS_TEST_PLANET_ENTID': idmap,
        'STAR_WARS_TEST_LIVE': 'FALSE',
        'STAR_WARS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['STAR_WARS_TEST_PLANET_ENTID'];
    const live = 'TRUE' === env.STAR_WARS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STAR_WARS_TEST_PLANET_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.StarWarsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.STAR_WARS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PlanetEntity.test.js.map