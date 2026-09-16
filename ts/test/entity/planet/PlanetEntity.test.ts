

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


describe('PlanetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsSDK.test()
    const ent = testsdk.Planet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'planet.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"climate","req":false,"short":"The climate of this planet","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created","req":false,"short":"The ISO 8601 date format of the time that this resource was created","type":"`$STRING`","index$":1},{"active":true,"name":"diameter","req":false,"short":"The diameter of this planet in kilometers","type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"edited","req":false,"short":"The ISO 8601 date format of the time that this resource was edited","type":"`$STRING`","index$":3},{"active":true,"name":"films","req":false,"short":"An array of Film URL Resources that this planet has appeared in","type":"`$ARRAY`","index$":4},{"active":true,"name":"gravity","req":false,"short":"A number denoting the gravity of this planet","type":"`$STRING`","index$":5},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"name","req":false,"short":"The name of this planet","type":"`$STRING`","index$":7},{"active":true,"name":"orbital_period","req":false,"short":"The number of standard days it takes for this planet to complete a single orbit of its local star","type":"`$STRING`","index$":8},{"active":true,"name":"population","req":false,"short":"The average population of sentient beings inhabiting this planet","type":"`$STRING`","index$":9},{"active":true,"name":"residents","req":false,"short":"An array of People URL Resources that live on this planet","type":"`$ARRAY`","index$":10},{"active":true,"name":"rotation_period","req":false,"short":"The number of standard hours it takes for this planet to complete a single rotation on its axis","type":"`$STRING`","index$":11},{"active":true,"name":"surface_water","req":false,"short":"The percentage of the planet surface that is naturally occurring water","type":"`$STRING`","index$":12},{"active":true,"name":"terrain","req":false,"short":"The terrain of this planet","type":"`$STRING`","index$":13},{"active":true,"name":"url","req":false,"short":"The hypermedia URL of this resource","type":"`$STRING`","index$":14}],"id":{"field":"id","name":"id"},"name":"planet","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /planets","json":"{\"operationId\":\"getAllPlanets\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Search query to filter planets by name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"The total number of planets\",\"type\":\"integer\"},\"next\":{\"description\":\"The URL for the next page of results\",\"nullable\":true,\"type\":\"string\"},\"previous\":{\"description\":\"The URL for the previous page of results\",\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"climate\":{\"description\":\"The climate of this planet\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"diameter\":{\"description\":\"The diameter of this planet in kilometers\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"films\":{\"description\":\"An array of Film URL Resources that this planet has appeared in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"gravity\":{\"description\":\"A number denoting the gravity of this planet\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this planet\",\"type\":\"string\"},\"orbital_period\":{\"description\":\"The number of standard days it takes for this planet to complete a single orbit of its local star\",\"type\":\"string\"},\"population\":{\"description\":\"The average population of sentient beings inhabiting this planet\",\"type\":\"string\"},\"residents\":{\"description\":\"An array of People URL Resources that live on this planet\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"rotation_period\":{\"description\":\"The number of standard hours it takes for this planet to complete a single rotation on its axis\",\"type\":\"string\"},\"surface_water\":{\"description\":\"The percentage of the planet surface that is naturally occurring water\",\"type\":\"string\"},\"terrain\":{\"description\":\"The terrain of this planet\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/planets","segments":[{"lit":"planets"}],"select":{"exist":["page","search"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /planets/{id}","json":"{\"operationId\":\"getPlanetById\",\"parameters\":[{\"description\":\"ID of the planet to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"climate\":{\"description\":\"The climate of this planet\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"diameter\":{\"description\":\"The diameter of this planet in kilometers\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"films\":{\"description\":\"An array of Film URL Resources that this planet has appeared in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"gravity\":{\"description\":\"A number denoting the gravity of this planet\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this planet\",\"type\":\"string\"},\"orbital_period\":{\"description\":\"The number of standard days it takes for this planet to complete a single orbit of its local star\",\"type\":\"string\"},\"population\":{\"description\":\"The average population of sentient beings inhabiting this planet\",\"type\":\"string\"},\"residents\":{\"description\":\"An array of People URL Resources that live on this planet\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"rotation_period\":{\"description\":\"The number of standard hours it takes for this planet to complete a single rotation on its axis\",\"type\":\"string\"},\"surface_water\":{\"description\":\"The percentage of the planet surface that is naturally occurring water\",\"type\":\"string\"},\"terrain\":{\"description\":\"The terrain of this planet\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Planet not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/planets/{id}","segments":[{"lit":"planets"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"planet","name__orig":"planet","Name":"Planet","name_":"planet","name-":"planet","NAME":"PLANET","index$":3}, {"active":true,"entity":"planet","key$":"BasicPlanetFlow","kind":"basic","name":"BasicPlanetFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"planet_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"planet_ref01","srcdatavar":"planet_ref01_data","suffix":"_dt0"},"match":{"id":"planet01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-planet_ref01"}}],"index$":1}]}, 'Planet')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let planet_ref01_data = Object.values(setup.data.existing.planet)[0] as any

    // LIST
    const planet_ref01_ent = client.Planet()
    const planet_ref01_match: any = {}

    const planet_ref01_list = (await planet_ref01_ent.list(planet_ref01_match)).map((e: any) => e.data())


    // LOAD
    const planet_ref01_match_dt0: any = {}
    planet_ref01_match_dt0.id = planet_ref01_data.id
    const planet_ref01_data_dt0 = (await planet_ref01_ent.load(planet_ref01_match_dt0)).data()
    assert(planet_ref01_data_dt0.id === planet_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/planet/PlanetTestData.json')

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
    ['planet01','planet02','planet03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_TEST_PLANET_ENTID': idmap,
    'STAR_WARS_TEST_LIVE': 'FALSE',
    'STAR_WARS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_TEST_PLANET_ENTID']

  const live = 'TRUE' === env.STAR_WARS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_TEST_PLANET_ENTID']
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
  
