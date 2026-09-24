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
(0, node_test_1.describe)('FilmEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STAR_WARS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StarWarsSDK.test();
        const ent = testsdk.Film();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'film.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "characters": { "a": true, "h": "Characters", "n": "characters", "r": false, "sh": "An array of people resource URLs that are in this film", "t": "`$ARRAY`", "key$": "characters", "index$": 0 }, "created": { "a": true, "fo": "date-time", "h": "Created", "n": "created", "r": false, "sh": "The ISO 8601 date format of the time that this resource was created", "t": "`$STRING`", "key$": "created", "index$": 1 }, "director": { "a": true, "h": "Director", "n": "director", "r": false, "sh": "The name of the director of this film", "t": "`$STRING`", "key$": "director", "index$": 2 }, "edited": { "a": true, "fo": "date-time", "h": "Edited", "n": "edited", "r": false, "sh": "The ISO 8601 date format of the time that this resource was edited", "t": "`$STRING`", "key$": "edited", "index$": 3 }, "episode_id": { "a": true, "h": "Episode Id", "n": "episode_id", "r": false, "sh": "The episode number of this film", "t": "`$INTEGER`", "key$": "episode_id", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 5 }, "opening_crawl": { "a": true, "h": "Opening Crawl", "n": "opening_crawl", "r": false, "sh": "The opening paragraphs at the beginning of this film", "t": "`$STRING`", "key$": "opening_crawl", "index$": 6 }, "planets": { "a": true, "h": "Planets", "n": "planets", "r": false, "sh": "An array of planet resource URLs that are in this film", "t": "`$ARRAY`", "key$": "planets", "index$": 7 }, "producer": { "a": true, "h": "Producer", "n": "producer", "r": false, "sh": "The name(s) of the producer(s) of this film", "t": "`$STRING`", "key$": "producer", "index$": 8 }, "release_date": { "a": true, "fo": "date", "h": "Release Date", "n": "release_date", "r": false, "sh": "The release date of this film", "t": "`$STRING`", "key$": "release_date", "index$": 9 }, "species": { "a": true, "h": "Species", "n": "species", "r": false, "sh": "An array of species resource URLs that are in this film", "t": "`$ARRAY`", "key$": "species", "index$": 10 }, "starships": { "a": true, "h": "Starships", "n": "starships", "r": false, "sh": "An array of starship resource URLs that are in this film", "t": "`$ARRAY`", "key$": "starships", "index$": 11 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "sh": "The title of this film", "t": "`$STRING`", "key$": "title", "index$": 12 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "The hypermedia URL of this resource", "t": "`$STRING`", "key$": "url", "index$": 13 }, "vehicles": { "a": true, "h": "Vehicles", "n": "vehicles", "r": false, "sh": "An array of vehicle resource URLs that are in this film", "t": "`$ARRAY`", "key$": "vehicles", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "film", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /films", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/films", "q": { "exist": ["page", "search"] }, "r": {}, "s": [{ "lit": "films" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /films/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/films/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "films" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "film", "name__orig": "film", "Name": "Film", "name_": "film", "name-": "film", "NAME": "FILM", "index$": 0 }, { "active": true, "entity": "film", "key$": "BasicFilmFlow", "kind": "basic", "name": "BasicFilmFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "film_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "film_ref01", "srcdatavar": "film_ref01_data", "suffix": "_dt0" }, "m": { "id": "film01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-film_ref01" } }], "index$": 1 }] }, 'Film', { "GET /films": { "protocol": "http", "operationId": "getAllFilms", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "count": { "description": "The total number of films", "key$": "count", "type": "integer" }, "next": { "description": "The URL for the next page of results", "key$": "next", "nullable": true, "type": "string" }, "previous": { "description": "The URL for the previous page of results", "key$": "previous", "nullable": true, "type": "string" }, "results": { "items": { "properties": { "characters": { "description": "An array of people resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "characters" }, "created": { "description": "The ISO 8601 date format of the time that this resource was created", "format": "date-time", "type": "string", "key$": "created" }, "director": { "description": "The name of the director of this film", "type": "string", "key$": "director" }, "edited": { "description": "The ISO 8601 date format of the time that this resource was edited", "format": "date-time", "type": "string", "key$": "edited" }, "episode_id": { "description": "The episode number of this film", "type": "integer", "key$": "episode_id" }, "opening_crawl": { "description": "The opening paragraphs at the beginning of this film", "type": "string", "key$": "opening_crawl" }, "planets": { "description": "An array of planet resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "planets" }, "producer": { "description": "The name(s) of the producer(s) of this film", "type": "string", "key$": "producer" }, "release_date": { "description": "The release date of this film", "format": "date", "type": "string", "key$": "release_date" }, "species": { "description": "An array of species resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "species" }, "starships": { "description": "An array of starship resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "starships" }, "title": { "description": "The title of this film", "type": "string", "key$": "title" }, "url": { "description": "The hypermedia URL of this resource", "type": "string", "key$": "url" }, "vehicles": { "description": "An array of vehicle resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "vehicles" } }, "type": "object", "x-ref": "#/components/schemas/Film", "index$": 0 }, "key$": "results", "type": "array" } }, "x-ref": "#/components/schemas/FilmList" } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "schema": { "type": "integer", "default": 1 }, "index$": 0 }, { "name": "search", "in": "query", "description": "Search query to filter films by title", "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" }, "GET /films/{id}": { "protocol": "http", "operationId": "getFilmById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "title": { "description": "The title of this film", "type": "string", "key$": "title" }, "episode_id": { "description": "The episode number of this film", "type": "integer", "key$": "episode_id" }, "opening_crawl": { "description": "The opening paragraphs at the beginning of this film", "type": "string", "key$": "opening_crawl" }, "director": { "description": "The name of the director of this film", "type": "string", "key$": "director" }, "producer": { "description": "The name(s) of the producer(s) of this film", "type": "string", "key$": "producer" }, "release_date": { "description": "The release date of this film", "format": "date", "type": "string", "key$": "release_date" }, "characters": { "description": "An array of people resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "characters" }, "planets": { "description": "An array of planet resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "planets" }, "starships": { "description": "An array of starship resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "starships" }, "vehicles": { "description": "An array of vehicle resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "vehicles" }, "species": { "description": "An array of species resource URLs that are in this film", "items": { "type": "string" }, "type": "array", "key$": "species" }, "created": { "description": "The ISO 8601 date format of the time that this resource was created", "format": "date-time", "type": "string", "key$": "created" }, "edited": { "description": "The ISO 8601 date format of the time that this resource was edited", "format": "date-time", "type": "string", "key$": "edited" }, "url": { "description": "The hypermedia URL of this resource", "type": "string", "key$": "url" } }, "x-ref": "#/components/schemas/Film", "index$": 0 } } } }, "404": { "description": "Film not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the film to retrieve", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let film_ref01_data = Object.values(setup.data.existing.film)[0];
        // LIST
        const film_ref01_ent = client.Film();
        const film_ref01_match = {};
        const film_ref01_list = (await film_ref01_ent.list(film_ref01_match)).map((e) => e.data());
        // LOAD
        const film_ref01_match_dt0 = {};
        film_ref01_match_dt0.id = film_ref01_data.id;
        const film_ref01_data_dt0 = (await film_ref01_ent.load(film_ref01_match_dt0)).data();
        (0, node_assert_1.default)(film_ref01_data_dt0.id === film_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/film/FilmTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StarWarsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['film01', 'film02', 'film03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STAR_WARS_TEST_FILM_ENTID': idmap,
        'STAR_WARS_TEST_LIVE': 'FALSE',
        'STAR_WARS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['STAR_WARS_TEST_FILM_ENTID'];
    const live = 'TRUE' === env.STAR_WARS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STAR_WARS_TEST_FILM_ENTID'];
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
//# sourceMappingURL=FilmEntity.test.js.map