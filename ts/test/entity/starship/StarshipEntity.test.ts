

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { StarWarsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('StarshipEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsSDK.test()
    const ent = testsdk.Starship()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'starship.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"MGLT","req":false,"short":"The Maximum number of Megalights this starship can travel in a standard hour","type":"`$STRING`","index$":0},{"active":true,"name":"cargo_capacity","req":false,"short":"The maximum number of kilograms that this starship can transport","type":"`$STRING`","index$":1},{"active":true,"name":"consumables","req":false,"short":"The maximum length of time that this starship can provide consumables for its entire crew without having to resupply","type":"`$STRING`","index$":2},{"active":true,"name":"cost_in_credits","req":false,"short":"The cost of this starship new, in galactic credits","type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"created","req":false,"short":"The ISO 8601 date format of the time that this resource was created","type":"`$STRING`","index$":4},{"active":true,"name":"crew","req":false,"short":"The number of personnel needed to run or pilot this starship","type":"`$STRING`","index$":5},{"active":true,"format":"date-time","name":"edited","req":false,"short":"The ISO 8601 date format of the time that this resource was edited","type":"`$STRING`","index$":6},{"active":true,"name":"films","req":false,"short":"An array of Film URL Resources that this starship has appeared in","type":"`$ARRAY`","index$":7},{"active":true,"name":"hyperdrive_rating","req":false,"short":"The class of this starships hyperdrive","type":"`$STRING`","index$":8},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"length","req":false,"short":"The length of this starship in meters","type":"`$STRING`","index$":10},{"active":true,"name":"manufacturer","req":false,"short":"The manufacturer of this starship","type":"`$STRING`","index$":11},{"active":true,"name":"max_atmosphering_speed","req":false,"short":"The maximum speed of this starship in atmosphere","type":"`$STRING`","index$":12},{"active":true,"name":"model","req":false,"short":"The model or official name of this starship","type":"`$STRING`","index$":13},{"active":true,"name":"name","req":false,"short":"The name of this starship","type":"`$STRING`","index$":14},{"active":true,"name":"passengers","req":false,"short":"The number of non-essential people this starship can transport","type":"`$STRING`","index$":15},{"active":true,"name":"pilots","req":false,"short":"An array of People URL Resources that this starship has been piloted by","type":"`$ARRAY`","index$":16},{"active":true,"name":"starship_class","req":false,"short":"The class of this starship","type":"`$STRING`","index$":17},{"active":true,"name":"url","req":false,"short":"The hypermedia URL of this resource","type":"`$STRING`","index$":18}],"id":{"field":"id","name":"id"},"name":"starship","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /starships","json":"{\"operationId\":\"getAllStarships\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Search query to filter starships by name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"The total number of starships\",\"type\":\"integer\"},\"next\":{\"description\":\"The URL for the next page of results\",\"nullable\":true,\"type\":\"string\"},\"previous\":{\"description\":\"The URL for the previous page of results\",\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"MGLT\":{\"description\":\"The Maximum number of Megalights this starship can travel in a standard hour\",\"type\":\"string\"},\"cargo_capacity\":{\"description\":\"The maximum number of kilograms that this starship can transport\",\"type\":\"string\"},\"consumables\":{\"description\":\"The maximum length of time that this starship can provide consumables for its entire crew without having to resupply\",\"type\":\"string\"},\"cost_in_credits\":{\"description\":\"The cost of this starship new, in galactic credits\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"crew\":{\"description\":\"The number of personnel needed to run or pilot this starship\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"films\":{\"description\":\"An array of Film URL Resources that this starship has appeared in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hyperdrive_rating\":{\"description\":\"The class of this starships hyperdrive\",\"type\":\"string\"},\"length\":{\"description\":\"The length of this starship in meters\",\"type\":\"string\"},\"manufacturer\":{\"description\":\"The manufacturer of this starship\",\"type\":\"string\"},\"max_atmosphering_speed\":{\"description\":\"The maximum speed of this starship in atmosphere\",\"type\":\"string\"},\"model\":{\"description\":\"The model or official name of this starship\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this starship\",\"type\":\"string\"},\"passengers\":{\"description\":\"The number of non-essential people this starship can transport\",\"type\":\"string\"},\"pilots\":{\"description\":\"An array of People URL Resources that this starship has been piloted by\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"starship_class\":{\"description\":\"The class of this starship\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/starships","segments":[{"lit":"starships"}],"select":{"exist":["page","search"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /starships/{id}","json":"{\"operationId\":\"getStarshipById\",\"parameters\":[{\"description\":\"ID of the starship to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"MGLT\":{\"description\":\"The Maximum number of Megalights this starship can travel in a standard hour\",\"type\":\"string\"},\"cargo_capacity\":{\"description\":\"The maximum number of kilograms that this starship can transport\",\"type\":\"string\"},\"consumables\":{\"description\":\"The maximum length of time that this starship can provide consumables for its entire crew without having to resupply\",\"type\":\"string\"},\"cost_in_credits\":{\"description\":\"The cost of this starship new, in galactic credits\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"crew\":{\"description\":\"The number of personnel needed to run or pilot this starship\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"films\":{\"description\":\"An array of Film URL Resources that this starship has appeared in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hyperdrive_rating\":{\"description\":\"The class of this starships hyperdrive\",\"type\":\"string\"},\"length\":{\"description\":\"The length of this starship in meters\",\"type\":\"string\"},\"manufacturer\":{\"description\":\"The manufacturer of this starship\",\"type\":\"string\"},\"max_atmosphering_speed\":{\"description\":\"The maximum speed of this starship in atmosphere\",\"type\":\"string\"},\"model\":{\"description\":\"The model or official name of this starship\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this starship\",\"type\":\"string\"},\"passengers\":{\"description\":\"The number of non-essential people this starship can transport\",\"type\":\"string\"},\"pilots\":{\"description\":\"An array of People URL Resources that this starship has been piloted by\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"starship_class\":{\"description\":\"The class of this starship\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Starship not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/starships/{id}","segments":[{"lit":"starships"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"starship","name__orig":"starship","Name":"Starship","name_":"starship","name-":"starship","NAME":"STARSHIP","index$":5}, {"active":true,"entity":"starship","key$":"BasicStarshipFlow","kind":"basic","name":"BasicStarshipFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"starship_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"starship_ref01","srcdatavar":"starship_ref01_data","suffix":"_dt0"},"match":{"id":"starship01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-starship_ref01"}}],"index$":1}]}, 'Starship')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let starship_ref01_data = Object.values(setup.data.existing.starship)[0] as any

    // LIST
    const starship_ref01_ent = client.Starship()
    const starship_ref01_match: any = {}

    const starship_ref01_list = (await starship_ref01_ent.list(starship_ref01_match)).map((e: any) => e.data())


    // LOAD
    const starship_ref01_match_dt0: any = {}
    starship_ref01_match_dt0.id = starship_ref01_data.id
    const starship_ref01_data_dt0 = (await starship_ref01_ent.load(starship_ref01_match_dt0)).data()
    assert(starship_ref01_data_dt0.id === starship_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/starship/StarshipTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = StarWarsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['starship01','starship02','starship03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_TEST_STARSHIP_ENTID': idmap,
    'STAR_WARS_TEST_LIVE': 'FALSE',
    'STAR_WARS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_TEST_STARSHIP_ENTID']

  const live = 'TRUE' === env.STAR_WARS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_TEST_STARSHIP_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new StarWarsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
