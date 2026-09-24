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
(0, node_test_1.describe)('VehicleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('STAR_WARS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.StarWarsSDK.test();
        const ent = testsdk.Vehicle();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'vehicle.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cargo_capacity": { "a": true, "h": "Cargo Capacity", "n": "cargo_capacity", "r": false, "sh": "The maximum number of kilograms that this vehicle can transport", "t": "`$STRING`", "key$": "cargo_capacity", "index$": 0 }, "consumables": { "a": true, "h": "Consumables", "n": "consumables", "r": false, "sh": "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply", "t": "`$STRING`", "key$": "consumables", "index$": 1 }, "cost_in_credits": { "a": true, "h": "Cost In Credits", "n": "cost_in_credits", "r": false, "sh": "The cost of this vehicle new, in galactic credits", "t": "`$STRING`", "key$": "cost_in_credits", "index$": 2 }, "created": { "a": true, "fo": "date-time", "h": "Created", "n": "created", "r": false, "sh": "The ISO 8601 date format of the time that this resource was created", "t": "`$STRING`", "key$": "created", "index$": 3 }, "crew": { "a": true, "h": "Crew", "n": "crew", "r": false, "sh": "The number of personnel needed to run or pilot this vehicle", "t": "`$STRING`", "key$": "crew", "index$": 4 }, "edited": { "a": true, "fo": "date-time", "h": "Edited", "n": "edited", "r": false, "sh": "The ISO 8601 date format of the time that this resource was edited", "t": "`$STRING`", "key$": "edited", "index$": 5 }, "films": { "a": true, "h": "Films", "n": "films", "r": false, "sh": "An array of Film URL Resources that this vehicle has appeared in", "t": "`$ARRAY`", "key$": "films", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 7 }, "length": { "a": true, "h": "Length", "n": "length", "r": false, "sh": "The length of this vehicle in meters", "t": "`$STRING`", "key$": "length", "index$": 8 }, "manufacturer": { "a": true, "h": "Manufacturer", "n": "manufacturer", "r": false, "sh": "The manufacturer of this vehicle", "t": "`$STRING`", "key$": "manufacturer", "index$": 9 }, "max_atmosphering_speed": { "a": true, "h": "Max Atmosphering Speed", "n": "max_atmosphering_speed", "r": false, "sh": "The maximum speed of this vehicle in atmosphere", "t": "`$STRING`", "key$": "max_atmosphering_speed", "index$": 10 }, "model": { "a": true, "h": "Model", "n": "model", "r": false, "sh": "The model or official name of this vehicle", "t": "`$STRING`", "key$": "model", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of this vehicle", "t": "`$STRING`", "key$": "name", "index$": 12 }, "passengers": { "a": true, "h": "Passengers", "n": "passengers", "r": false, "sh": "The number of non-essential people this vehicle can transport", "t": "`$STRING`", "key$": "passengers", "index$": 13 }, "pilots": { "a": true, "h": "Pilots", "n": "pilots", "r": false, "sh": "An array of People URL Resources that this vehicle has been piloted by", "t": "`$ARRAY`", "key$": "pilots", "index$": 14 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "The hypermedia URL of this resource", "t": "`$STRING`", "key$": "url", "index$": 15 }, "vehicle_class": { "a": true, "h": "Vehicle Class", "n": "vehicle_class", "r": false, "sh": "The class of this vehicle", "t": "`$STRING`", "key$": "vehicle_class", "index$": 16 } }, "id": { "field": "id", "name": "id" }, "name": "vehicle", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /vehicles", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/vehicles", "q": { "exist": ["page", "search"] }, "r": {}, "s": [{ "lit": "vehicles" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /vehicles/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/vehicles/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "vehicles" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "vehicle", "name__orig": "vehicle", "Name": "Vehicle", "name_": "vehicle", "name-": "vehicle", "NAME": "VEHICLE", "index$": 5 }, { "active": true, "entity": "vehicle", "key$": "BasicVehicleFlow", "kind": "basic", "name": "BasicVehicleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "vehicle_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "vehicle_ref01", "srcdatavar": "vehicle_ref01_data", "suffix": "_dt0" }, "m": { "id": "vehicle01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-vehicle_ref01" } }], "index$": 1 }] }, 'Vehicle', { "GET /vehicles": { "protocol": "http", "operationId": "getAllVehicles", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "count": { "description": "The total number of vehicles", "key$": "count", "type": "integer" }, "next": { "description": "The URL for the next page of results", "key$": "next", "nullable": true, "type": "string" }, "previous": { "description": "The URL for the previous page of results", "key$": "previous", "nullable": true, "type": "string" }, "results": { "items": { "properties": { "cargo_capacity": { "description": "The maximum number of kilograms that this vehicle can transport", "type": "string", "key$": "cargo_capacity" }, "consumables": { "description": "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply", "type": "string", "key$": "consumables" }, "cost_in_credits": { "description": "The cost of this vehicle new, in galactic credits", "type": "string", "key$": "cost_in_credits" }, "created": { "description": "The ISO 8601 date format of the time that this resource was created", "format": "date-time", "type": "string", "key$": "created" }, "crew": { "description": "The number of personnel needed to run or pilot this vehicle", "type": "string", "key$": "crew" }, "edited": { "description": "The ISO 8601 date format of the time that this resource was edited", "format": "date-time", "type": "string", "key$": "edited" }, "films": { "description": "An array of Film URL Resources that this vehicle has appeared in", "items": { "type": "string" }, "type": "array", "key$": "films" }, "length": { "description": "The length of this vehicle in meters", "type": "string", "key$": "length" }, "manufacturer": { "description": "The manufacturer of this vehicle", "type": "string", "key$": "manufacturer" }, "max_atmosphering_speed": { "description": "The maximum speed of this vehicle in atmosphere", "type": "string", "key$": "max_atmosphering_speed" }, "model": { "description": "The model or official name of this vehicle", "type": "string", "key$": "model" }, "name": { "description": "The name of this vehicle", "type": "string", "key$": "name" }, "passengers": { "description": "The number of non-essential people this vehicle can transport", "type": "string", "key$": "passengers" }, "pilots": { "description": "An array of People URL Resources that this vehicle has been piloted by", "items": { "type": "string" }, "type": "array", "key$": "pilots" }, "url": { "description": "The hypermedia URL of this resource", "type": "string", "key$": "url" }, "vehicle_class": { "description": "The class of this vehicle", "type": "string", "key$": "vehicle_class" } }, "type": "object", "x-ref": "#/components/schemas/Vehicle", "index$": 0 }, "key$": "results", "type": "array" } }, "x-ref": "#/components/schemas/VehicleList" } } } } }, "parameters": [{ "name": "page", "in": "query", "description": "Page number for pagination", "schema": { "type": "integer", "default": 1 }, "index$": 0 }, { "name": "search", "in": "query", "description": "Search query to filter vehicles by name", "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" }, "GET /vehicles/{id}": { "protocol": "http", "operationId": "getVehicleById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "description": "The name of this vehicle", "type": "string", "key$": "name" }, "model": { "description": "The model or official name of this vehicle", "type": "string", "key$": "model" }, "manufacturer": { "description": "The manufacturer of this vehicle", "type": "string", "key$": "manufacturer" }, "cost_in_credits": { "description": "The cost of this vehicle new, in galactic credits", "type": "string", "key$": "cost_in_credits" }, "length": { "description": "The length of this vehicle in meters", "type": "string", "key$": "length" }, "max_atmosphering_speed": { "description": "The maximum speed of this vehicle in atmosphere", "type": "string", "key$": "max_atmosphering_speed" }, "crew": { "description": "The number of personnel needed to run or pilot this vehicle", "type": "string", "key$": "crew" }, "passengers": { "description": "The number of non-essential people this vehicle can transport", "type": "string", "key$": "passengers" }, "cargo_capacity": { "description": "The maximum number of kilograms that this vehicle can transport", "type": "string", "key$": "cargo_capacity" }, "consumables": { "description": "The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply", "type": "string", "key$": "consumables" }, "vehicle_class": { "description": "The class of this vehicle", "type": "string", "key$": "vehicle_class" }, "pilots": { "description": "An array of People URL Resources that this vehicle has been piloted by", "items": { "type": "string" }, "type": "array", "key$": "pilots" }, "films": { "description": "An array of Film URL Resources that this vehicle has appeared in", "items": { "type": "string" }, "type": "array", "key$": "films" }, "created": { "description": "The ISO 8601 date format of the time that this resource was created", "format": "date-time", "type": "string", "key$": "created" }, "edited": { "description": "The ISO 8601 date format of the time that this resource was edited", "format": "date-time", "type": "string", "key$": "edited" }, "url": { "description": "The hypermedia URL of this resource", "type": "string", "key$": "url" } }, "x-ref": "#/components/schemas/Vehicle", "index$": 0 } } } }, "404": { "description": "Vehicle not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the vehicle to retrieve", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let vehicle_ref01_data = Object.values(setup.data.existing.vehicle)[0];
        // LIST
        const vehicle_ref01_ent = client.Vehicle();
        const vehicle_ref01_match = {};
        const vehicle_ref01_list = (await vehicle_ref01_ent.list(vehicle_ref01_match)).map((e) => e.data());
        // LOAD
        const vehicle_ref01_match_dt0 = {};
        vehicle_ref01_match_dt0.id = vehicle_ref01_data.id;
        const vehicle_ref01_data_dt0 = (await vehicle_ref01_ent.load(vehicle_ref01_match_dt0)).data();
        (0, node_assert_1.default)(vehicle_ref01_data_dt0.id === vehicle_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/vehicle/VehicleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.StarWarsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['vehicle01', 'vehicle02', 'vehicle03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'STAR_WARS_TEST_VEHICLE_ENTID': idmap,
        'STAR_WARS_TEST_LIVE': 'FALSE',
        'STAR_WARS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['STAR_WARS_TEST_VEHICLE_ENTID'];
    const live = 'TRUE' === env.STAR_WARS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['STAR_WARS_TEST_VEHICLE_ENTID'];
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
//# sourceMappingURL=VehicleEntity.test.js.map