

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


describe('SpeciesEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsSDK.test()
    const ent = testsdk.Species()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'species.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"average_height","req":false,"short":"The average height of this species in centimeters","type":"`$STRING`","index$":0},{"active":true,"name":"average_lifespan","req":false,"short":"The average lifespan of this species in years","type":"`$STRING`","index$":1},{"active":true,"name":"classification","req":false,"short":"The classification of this species","type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"created","req":false,"short":"The ISO 8601 date format of the time that this resource was created","type":"`$STRING`","index$":3},{"active":true,"name":"designation","req":false,"short":"The designation of this species","type":"`$STRING`","index$":4},{"active":true,"format":"date-time","name":"edited","req":false,"short":"The ISO 8601 date format of the time that this resource was edited","type":"`$STRING`","index$":5},{"active":true,"name":"eye_colors","req":false,"short":"A comma-separated string of common eye colors for this species","type":"`$STRING`","index$":6},{"active":true,"name":"films","req":false,"short":"An array of Film URL Resources that this species has appeared in","type":"`$ARRAY`","index$":7},{"active":true,"name":"hair_colors","req":false,"short":"A comma-separated string of common hair colors for this species","type":"`$STRING`","index$":8},{"active":true,"name":"homeworld","req":false,"short":"The URL of a planet resource that is the homeworld of this species","type":"`$STRING`","index$":9},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"language","req":false,"short":"The language commonly spoken by this species","type":"`$STRING`","index$":11},{"active":true,"name":"name","req":false,"short":"The name of this species","type":"`$STRING`","index$":12},{"active":true,"name":"people","req":false,"short":"An array of People URL Resources that are a part of this species","type":"`$ARRAY`","index$":13},{"active":true,"name":"skin_colors","req":false,"short":"A comma-separated string of common skin colors for this species","type":"`$STRING`","index$":14},{"active":true,"name":"url","req":false,"short":"The hypermedia URL of this resource","type":"`$STRING`","index$":15}],"id":{"field":"id","name":"id"},"name":"species","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /species","json":"{\"operationId\":\"getAllSpecies\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Search query to filter species by name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"The total number of species\",\"type\":\"integer\"},\"next\":{\"description\":\"The URL for the next page of results\",\"nullable\":true,\"type\":\"string\"},\"previous\":{\"description\":\"The URL for the previous page of results\",\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"average_height\":{\"description\":\"The average height of this species in centimeters\",\"type\":\"string\"},\"average_lifespan\":{\"description\":\"The average lifespan of this species in years\",\"type\":\"string\"},\"classification\":{\"description\":\"The classification of this species\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"designation\":{\"description\":\"The designation of this species\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"eye_colors\":{\"description\":\"A comma-separated string of common eye colors for this species\",\"type\":\"string\"},\"films\":{\"description\":\"An array of Film URL Resources that this species has appeared in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hair_colors\":{\"description\":\"A comma-separated string of common hair colors for this species\",\"type\":\"string\"},\"homeworld\":{\"description\":\"The URL of a planet resource that is the homeworld of this species\",\"nullable\":true,\"type\":\"string\"},\"language\":{\"description\":\"The language commonly spoken by this species\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this species\",\"type\":\"string\"},\"people\":{\"description\":\"An array of People URL Resources that are a part of this species\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"skin_colors\":{\"description\":\"A comma-separated string of common skin colors for this species\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/species","segments":[{"lit":"species"}],"select":{"exist":["page","search"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /species/{id}","json":"{\"operationId\":\"getSpeciesById\",\"parameters\":[{\"description\":\"ID of the species to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"average_height\":{\"description\":\"The average height of this species in centimeters\",\"type\":\"string\"},\"average_lifespan\":{\"description\":\"The average lifespan of this species in years\",\"type\":\"string\"},\"classification\":{\"description\":\"The classification of this species\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"designation\":{\"description\":\"The designation of this species\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"eye_colors\":{\"description\":\"A comma-separated string of common eye colors for this species\",\"type\":\"string\"},\"films\":{\"description\":\"An array of Film URL Resources that this species has appeared in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hair_colors\":{\"description\":\"A comma-separated string of common hair colors for this species\",\"type\":\"string\"},\"homeworld\":{\"description\":\"The URL of a planet resource that is the homeworld of this species\",\"nullable\":true,\"type\":\"string\"},\"language\":{\"description\":\"The language commonly spoken by this species\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this species\",\"type\":\"string\"},\"people\":{\"description\":\"An array of People URL Resources that are a part of this species\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"skin_colors\":{\"description\":\"A comma-separated string of common skin colors for this species\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Species not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/species/{id}","segments":[{"lit":"species"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"species","name__orig":"species","Name":"Species","name_":"species","name-":"species","NAME":"SPECIES","index$":4}, {"active":true,"entity":"species","key$":"BasicSpeciesFlow","kind":"basic","name":"BasicSpeciesFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"species_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"species_ref01","srcdatavar":"species_ref01_data","suffix":"_dt0"},"match":{"id":"species01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-species_ref01"}}],"index$":1}]}, 'Species')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let species_ref01_data = Object.values(setup.data.existing.species)[0] as any

    // LIST
    const species_ref01_ent = client.Species()
    const species_ref01_match: any = {}

    const species_ref01_list = (await species_ref01_ent.list(species_ref01_match)).map((e: any) => e.data())


    // LOAD
    const species_ref01_match_dt0: any = {}
    species_ref01_match_dt0.id = species_ref01_data.id
    const species_ref01_data_dt0 = (await species_ref01_ent.load(species_ref01_match_dt0)).data()
    assert(species_ref01_data_dt0.id === species_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/species/SpeciesTestData.json')

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
    ['species01','species02','species03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_TEST_SPECIES_ENTID': idmap,
    'STAR_WARS_TEST_LIVE': 'FALSE',
    'STAR_WARS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_TEST_SPECIES_ENTID']

  const live = 'TRUE' === env.STAR_WARS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_TEST_SPECIES_ENTID']
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
  
