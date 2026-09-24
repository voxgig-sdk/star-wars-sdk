

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"average_height":{"a":true,"h":"Average Height","n":"average_height","r":false,"sh":"The average height of this species in centimeters","t":"`$STRING`","key$":"average_height","index$":0},"average_lifespan":{"a":true,"h":"Average Lifespan","n":"average_lifespan","r":false,"sh":"The average lifespan of this species in years","t":"`$STRING`","key$":"average_lifespan","index$":1},"classification":{"a":true,"h":"Classification","n":"classification","r":false,"sh":"The classification of this species","t":"`$STRING`","key$":"classification","index$":2},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":false,"sh":"The ISO 8601 date format of the time that this resource was created","t":"`$STRING`","key$":"created","index$":3},"designation":{"a":true,"h":"Designation","n":"designation","r":false,"sh":"The designation of this species","t":"`$STRING`","key$":"designation","index$":4},"edited":{"a":true,"fo":"date-time","h":"Edited","n":"edited","r":false,"sh":"The ISO 8601 date format of the time that this resource was edited","t":"`$STRING`","key$":"edited","index$":5},"eye_colors":{"a":true,"h":"Eye Colors","n":"eye_colors","r":false,"sh":"A comma-separated string of common eye colors for this species","t":"`$STRING`","key$":"eye_colors","index$":6},"films":{"a":true,"h":"Films","n":"films","r":false,"sh":"An array of Film URL Resources that this species has appeared in","t":"`$ARRAY`","key$":"films","index$":7},"hair_colors":{"a":true,"h":"Hair Colors","n":"hair_colors","r":false,"sh":"A comma-separated string of common hair colors for this species","t":"`$STRING`","key$":"hair_colors","index$":8},"homeworld":{"a":true,"h":"Homeworld","n":"homeworld","r":false,"sh":"The URL of a planet resource that is the homeworld of this species","t":"`$STRING`","key$":"homeworld","index$":9},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":10},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"The language commonly spoken by this species","t":"`$STRING`","key$":"language","index$":11},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of this species","t":"`$STRING`","key$":"name","index$":12},"people":{"a":true,"h":"People","n":"people","r":false,"sh":"An array of People URL Resources that are a part of this species","t":"`$ARRAY`","key$":"people","index$":13},"skin_colors":{"a":true,"h":"Skin Colors","n":"skin_colors","r":false,"sh":"A comma-separated string of common skin colors for this species","t":"`$STRING`","key$":"skin_colors","index$":14},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"The hypermedia URL of this resource","t":"`$STRING`","key$":"url","index$":15}},"id":{"field":"id","name":"id"},"name":"species","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /species","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/species","q":{"exist":["page","search"]},"r":{},"s":[{"lit":"species"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /species/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/species/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"species"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"species","name__orig":"species","Name":"Species","name_":"species","name-":"species","NAME":"SPECIES","index$":3}, {"active":true,"entity":"species","key$":"BasicSpeciesFlow","kind":"basic","name":"BasicSpeciesFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"species_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"species_ref01","srcdatavar":"species_ref01_data","suffix":"_dt0"},"m":{"id":"species01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-species_ref01"}}],"index$":1}]}, 'Species', {"GET /species":{"protocol":"http","operationId":"getAllSpecies","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"description":"The total number of species","key$":"count","type":"integer"},"next":{"description":"The URL for the next page of results","key$":"next","nullable":true,"type":"string"},"previous":{"description":"The URL for the previous page of results","key$":"previous","nullable":true,"type":"string"},"results":{"items":{"properties":{"average_height":{"description":"The average height of this species in centimeters","type":"string","key$":"average_height"},"average_lifespan":{"description":"The average lifespan of this species in years","type":"string","key$":"average_lifespan"},"classification":{"description":"The classification of this species","type":"string","key$":"classification"},"created":{"description":"The ISO 8601 date format of the time that this resource was created","format":"date-time","type":"string","key$":"created"},"designation":{"description":"The designation of this species","type":"string","key$":"designation"},"edited":{"description":"The ISO 8601 date format of the time that this resource was edited","format":"date-time","type":"string","key$":"edited"},"eye_colors":{"description":"A comma-separated string of common eye colors for this species","type":"string","key$":"eye_colors"},"films":{"description":"An array of Film URL Resources that this species has appeared in","items":{"type":"string"},"type":"array","key$":"films"},"hair_colors":{"description":"A comma-separated string of common hair colors for this species","type":"string","key$":"hair_colors"},"homeworld":{"description":"The URL of a planet resource that is the homeworld of this species","nullable":true,"type":"string","key$":"homeworld"},"language":{"description":"The language commonly spoken by this species","type":"string","key$":"language"},"name":{"description":"The name of this species","type":"string","key$":"name"},"people":{"description":"An array of People URL Resources that are a part of this species","items":{"type":"string"},"type":"array","key$":"people"},"skin_colors":{"description":"A comma-separated string of common skin colors for this species","type":"string","key$":"skin_colors"},"url":{"description":"The hypermedia URL of this resource","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Species","index$":0},"key$":"results","type":"array"}},"x-ref":"#/components/schemas/SpeciesList"}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","schema":{"type":"integer","default":1},"index$":0},{"name":"search","in":"query","description":"Search query to filter species by name","schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /species/{id}":{"protocol":"http","operationId":"getSpeciesById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"name":{"description":"The name of this species","type":"string","key$":"name"},"classification":{"description":"The classification of this species","type":"string","key$":"classification"},"designation":{"description":"The designation of this species","type":"string","key$":"designation"},"average_height":{"description":"The average height of this species in centimeters","type":"string","key$":"average_height"},"skin_colors":{"description":"A comma-separated string of common skin colors for this species","type":"string","key$":"skin_colors"},"hair_colors":{"description":"A comma-separated string of common hair colors for this species","type":"string","key$":"hair_colors"},"eye_colors":{"description":"A comma-separated string of common eye colors for this species","type":"string","key$":"eye_colors"},"average_lifespan":{"description":"The average lifespan of this species in years","type":"string","key$":"average_lifespan"},"homeworld":{"description":"The URL of a planet resource that is the homeworld of this species","nullable":true,"type":"string","key$":"homeworld"},"language":{"description":"The language commonly spoken by this species","type":"string","key$":"language"},"people":{"description":"An array of People URL Resources that are a part of this species","items":{"type":"string"},"type":"array","key$":"people"},"films":{"description":"An array of Film URL Resources that this species has appeared in","items":{"type":"string"},"type":"array","key$":"films"},"created":{"description":"The ISO 8601 date format of the time that this resource was created","format":"date-time","type":"string","key$":"created"},"edited":{"description":"The ISO 8601 date format of the time that this resource was edited","format":"date-time","type":"string","key$":"edited"},"url":{"description":"The hypermedia URL of this resource","type":"string","key$":"url"}},"x-ref":"#/components/schemas/Species","index$":0}}}},"404":{"description":"Species not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"ID of the species to retrieve","schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
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
  
