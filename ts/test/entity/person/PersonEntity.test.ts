

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


describe('PersonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsSDK.test()
    const ent = testsdk.Person()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'person.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"birth_year","req":false,"short":"The birth year of the person, using the in-universe standard of BBY or ABY","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created","req":false,"short":"The ISO 8601 date format of the time that this resource was created","type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"edited","req":false,"short":"The ISO 8601 date format of the time that this resource was edited","type":"`$STRING`","index$":2},{"active":true,"name":"eye_color","req":false,"short":"The eye color of this person","type":"`$STRING`","index$":3},{"active":true,"name":"films","req":false,"short":"An array of film resource URLs that this person has been in","type":"`$ARRAY`","index$":4},{"active":true,"name":"gender","req":false,"short":"The gender of this person","type":"`$STRING`","index$":5},{"active":true,"name":"hair_color","req":false,"short":"The hair color of this person","type":"`$STRING`","index$":6},{"active":true,"name":"height","req":false,"short":"The height of the person in centimeters","type":"`$STRING`","index$":7},{"active":true,"name":"homeworld","req":false,"short":"The URL of the planet resource that this person was born on","type":"`$STRING`","index$":8},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"mass","req":false,"short":"The mass of the person in kilograms","type":"`$STRING`","index$":10},{"active":true,"name":"name","req":false,"short":"The name of this person","type":"`$STRING`","index$":11},{"active":true,"name":"skin_color","req":false,"short":"The skin color of this person","type":"`$STRING`","index$":12},{"active":true,"name":"species","req":false,"short":"An array of species resource URLs that this person belongs to","type":"`$ARRAY`","index$":13},{"active":true,"name":"starships","req":false,"short":"An array of starship resource URLs that this person has piloted","type":"`$ARRAY`","index$":14},{"active":true,"name":"url","req":false,"short":"The hypermedia URL of this resource","type":"`$STRING`","index$":15},{"active":true,"name":"vehicles","req":false,"short":"An array of vehicle resource URLs that this person has piloted","type":"`$ARRAY`","index$":16}],"id":{"field":"id","name":"id"},"name":"person","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /people","json":"{\"operationId\":\"getAllPeople\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Search query to filter people by name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"The total number of people\",\"type\":\"integer\"},\"next\":{\"description\":\"The URL for the next page of results\",\"nullable\":true,\"type\":\"string\"},\"previous\":{\"description\":\"The URL for the previous page of results\",\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"birth_year\":{\"description\":\"The birth year of the person, using the in-universe standard of BBY or ABY\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"eye_color\":{\"description\":\"The eye color of this person\",\"type\":\"string\"},\"films\":{\"description\":\"An array of film resource URLs that this person has been in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"gender\":{\"description\":\"The gender of this person\",\"type\":\"string\"},\"hair_color\":{\"description\":\"The hair color of this person\",\"type\":\"string\"},\"height\":{\"description\":\"The height of the person in centimeters\",\"type\":\"string\"},\"homeworld\":{\"description\":\"The URL of the planet resource that this person was born on\",\"type\":\"string\"},\"mass\":{\"description\":\"The mass of the person in kilograms\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this person\",\"type\":\"string\"},\"skin_color\":{\"description\":\"The skin color of this person\",\"type\":\"string\"},\"species\":{\"description\":\"An array of species resource URLs that this person belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"starships\":{\"description\":\"An array of starship resource URLs that this person has piloted\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"},\"vehicles\":{\"description\":\"An array of vehicle resource URLs that this person has piloted\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/people","segments":[{"lit":"people"}],"select":{"exist":["page","search"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /people/{id}","json":"{\"operationId\":\"getPersonById\",\"parameters\":[{\"description\":\"ID of the person to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"birth_year\":\"19BBY\",\"created\":\"2014-12-09T13:50:51.644000Z\",\"edited\":\"2014-12-20T21:17:56.891000Z\",\"eye_color\":\"blue\",\"films\":[\"https://swapi.dev/api/films/2/\",\"https://swapi.dev/api/films/6/\",\"https://swapi.dev/api/films/3/\",\"https://swapi.dev/api/films/1/\",\"https://swapi.dev/api/films/7/\"],\"gender\":\"male\",\"hair_color\":\"blond\",\"height\":\"172\",\"homeworld\":\"https://swapi.dev/api/planets/1/\",\"mass\":\"77\",\"name\":\"Luke Skywalker\",\"skin_color\":\"fair\",\"species\":[\"https://swapi.dev/api/species/1/\"],\"starships\":[\"https://swapi.dev/api/starships/12/\",\"https://swapi.dev/api/starships/22/\"],\"url\":\"https://swapi.dev/api/people/1/\",\"vehicles\":[\"https://swapi.dev/api/vehicles/14/\",\"https://swapi.dev/api/vehicles/30/\"]},\"schema\":{\"properties\":{\"birth_year\":{\"description\":\"The birth year of the person, using the in-universe standard of BBY or ABY\",\"type\":\"string\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"eye_color\":{\"description\":\"The eye color of this person\",\"type\":\"string\"},\"films\":{\"description\":\"An array of film resource URLs that this person has been in\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"gender\":{\"description\":\"The gender of this person\",\"type\":\"string\"},\"hair_color\":{\"description\":\"The hair color of this person\",\"type\":\"string\"},\"height\":{\"description\":\"The height of the person in centimeters\",\"type\":\"string\"},\"homeworld\":{\"description\":\"The URL of the planet resource that this person was born on\",\"type\":\"string\"},\"mass\":{\"description\":\"The mass of the person in kilograms\",\"type\":\"string\"},\"name\":{\"description\":\"The name of this person\",\"type\":\"string\"},\"skin_color\":{\"description\":\"The skin color of this person\",\"type\":\"string\"},\"species\":{\"description\":\"An array of species resource URLs that this person belongs to\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"starships\":{\"description\":\"An array of starship resource URLs that this person has piloted\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"},\"vehicles\":{\"description\":\"An array of vehicle resource URLs that this person has piloted\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Person not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/people/{id}","segments":[{"lit":"people"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"person","name__orig":"person","Name":"Person","name_":"person","name-":"person","NAME":"PERSON","index$":2}, {"active":true,"entity":"person","key$":"BasicPersonFlow","kind":"basic","name":"BasicPersonFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"person_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"person_ref01","srcdatavar":"person_ref01_data","suffix":"_dt0"},"match":{"id":"person01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-person_ref01"}}],"index$":1}]}, 'Person')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let person_ref01_data = Object.values(setup.data.existing.person)[0] as any

    // LIST
    const person_ref01_ent = client.Person()
    const person_ref01_match: any = {}

    const person_ref01_list = (await person_ref01_ent.list(person_ref01_match)).map((e: any) => e.data())


    // LOAD
    const person_ref01_match_dt0: any = {}
    person_ref01_match_dt0.id = person_ref01_data.id
    const person_ref01_data_dt0 = (await person_ref01_ent.load(person_ref01_match_dt0)).data()
    assert(person_ref01_data_dt0.id === person_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/person/PersonTestData.json')

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
    ['person01','person02','person03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_TEST_PERSON_ENTID': idmap,
    'STAR_WARS_TEST_LIVE': 'FALSE',
    'STAR_WARS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_TEST_PERSON_ENTID']

  const live = 'TRUE' === env.STAR_WARS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_TEST_PERSON_ENTID']
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
  
