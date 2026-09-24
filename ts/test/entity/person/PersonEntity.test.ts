

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"birth_year":{"a":true,"h":"Birth Year","n":"birth_year","r":false,"sh":"The birth year of the person, using the in-universe standard of BBY or ABY","t":"`$STRING`","key$":"birth_year","index$":0},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":false,"sh":"The ISO 8601 date format of the time that this resource was created","t":"`$STRING`","key$":"created","index$":1},"edited":{"a":true,"fo":"date-time","h":"Edited","n":"edited","r":false,"sh":"The ISO 8601 date format of the time that this resource was edited","t":"`$STRING`","key$":"edited","index$":2},"eye_color":{"a":true,"h":"Eye Color","n":"eye_color","r":false,"sh":"The eye color of this person","t":"`$STRING`","key$":"eye_color","index$":3},"films":{"a":true,"h":"Films","n":"films","r":false,"sh":"An array of film resource URLs that this person has been in","t":"`$ARRAY`","key$":"films","index$":4},"gender":{"a":true,"h":"Gender","n":"gender","r":false,"sh":"The gender of this person","t":"`$STRING`","key$":"gender","index$":5},"hair_color":{"a":true,"h":"Hair Color","n":"hair_color","r":false,"sh":"The hair color of this person","t":"`$STRING`","key$":"hair_color","index$":6},"height":{"a":true,"h":"Height","n":"height","r":false,"sh":"The height of the person in centimeters","t":"`$STRING`","key$":"height","index$":7},"homeworld":{"a":true,"h":"Homeworld","n":"homeworld","r":false,"sh":"The URL of the planet resource that this person was born on","t":"`$STRING`","key$":"homeworld","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":9},"mass":{"a":true,"h":"Mass","n":"mass","r":false,"sh":"The mass of the person in kilograms","t":"`$STRING`","key$":"mass","index$":10},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of this person","t":"`$STRING`","key$":"name","index$":11},"skin_color":{"a":true,"h":"Skin Color","n":"skin_color","r":false,"sh":"The skin color of this person","t":"`$STRING`","key$":"skin_color","index$":12},"species":{"a":true,"h":"Species","n":"species","r":false,"sh":"An array of species resource URLs that this person belongs to","t":"`$ARRAY`","key$":"species","index$":13},"starships":{"a":true,"h":"Starships","n":"starships","r":false,"sh":"An array of starship resource URLs that this person has piloted","t":"`$ARRAY`","key$":"starships","index$":14},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"The hypermedia URL of this resource","t":"`$STRING`","key$":"url","index$":15},"vehicles":{"a":true,"h":"Vehicles","n":"vehicles","r":false,"sh":"An array of vehicle resource URLs that this person has piloted","t":"`$ARRAY`","key$":"vehicles","index$":16}},"id":{"field":"id","name":"id"},"name":"person","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /people","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/people","q":{"exist":["page","search"]},"r":{},"s":[{"lit":"people"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /people/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/people/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"people"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"person","name__orig":"person","Name":"Person","name_":"person","name-":"person","NAME":"PERSON","index$":1}, {"active":true,"entity":"person","key$":"BasicPersonFlow","kind":"basic","name":"BasicPersonFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"person_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"person_ref01","srcdatavar":"person_ref01_data","suffix":"_dt0"},"m":{"id":"person01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-person_ref01"}}],"index$":1}]}, 'Person', {"GET /people":{"protocol":"http","operationId":"getAllPeople","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"description":"The total number of people","key$":"count","type":"integer"},"next":{"description":"The URL for the next page of results","key$":"next","nullable":true,"type":"string"},"previous":{"description":"The URL for the previous page of results","key$":"previous","nullable":true,"type":"string"},"results":{"items":{"properties":{"birth_year":{"description":"The birth year of the person, using the in-universe standard of BBY or ABY","type":"string","key$":"birth_year"},"created":{"description":"The ISO 8601 date format of the time that this resource was created","format":"date-time","type":"string","key$":"created"},"edited":{"description":"The ISO 8601 date format of the time that this resource was edited","format":"date-time","type":"string","key$":"edited"},"eye_color":{"description":"The eye color of this person","type":"string","key$":"eye_color"},"films":{"description":"An array of film resource URLs that this person has been in","items":{"type":"string"},"type":"array","key$":"films"},"gender":{"description":"The gender of this person","type":"string","key$":"gender"},"hair_color":{"description":"The hair color of this person","type":"string","key$":"hair_color"},"height":{"description":"The height of the person in centimeters","type":"string","key$":"height"},"homeworld":{"description":"The URL of the planet resource that this person was born on","type":"string","key$":"homeworld"},"mass":{"description":"The mass of the person in kilograms","type":"string","key$":"mass"},"name":{"description":"The name of this person","type":"string","key$":"name"},"skin_color":{"description":"The skin color of this person","type":"string","key$":"skin_color"},"species":{"description":"An array of species resource URLs that this person belongs to","items":{"type":"string"},"type":"array","key$":"species"},"starships":{"description":"An array of starship resource URLs that this person has piloted","items":{"type":"string"},"type":"array","key$":"starships"},"url":{"description":"The hypermedia URL of this resource","type":"string","key$":"url"},"vehicles":{"description":"An array of vehicle resource URLs that this person has piloted","items":{"type":"string"},"type":"array","key$":"vehicles"}},"type":"object","x-ref":"#/components/schemas/Person","index$":0},"key$":"results","type":"array"}},"x-ref":"#/components/schemas/PeopleList"}}}}},"parameters":[{"name":"page","in":"query","description":"Page number for pagination","schema":{"type":"integer","default":1},"index$":0},{"name":"search","in":"query","description":"Search query to filter people by name","schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /people/{id}":{"protocol":"http","operationId":"getPersonById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"name":{"description":"The name of this person","type":"string","key$":"name"},"height":{"description":"The height of the person in centimeters","type":"string","key$":"height"},"mass":{"description":"The mass of the person in kilograms","type":"string","key$":"mass"},"hair_color":{"description":"The hair color of this person","type":"string","key$":"hair_color"},"skin_color":{"description":"The skin color of this person","type":"string","key$":"skin_color"},"eye_color":{"description":"The eye color of this person","type":"string","key$":"eye_color"},"birth_year":{"description":"The birth year of the person, using the in-universe standard of BBY or ABY","type":"string","key$":"birth_year"},"gender":{"description":"The gender of this person","type":"string","key$":"gender"},"homeworld":{"description":"The URL of the planet resource that this person was born on","type":"string","key$":"homeworld"},"films":{"description":"An array of film resource URLs that this person has been in","items":{"type":"string"},"type":"array","key$":"films"},"species":{"description":"An array of species resource URLs that this person belongs to","items":{"type":"string"},"type":"array","key$":"species"},"vehicles":{"description":"An array of vehicle resource URLs that this person has piloted","items":{"type":"string"},"type":"array","key$":"vehicles"},"starships":{"description":"An array of starship resource URLs that this person has piloted","items":{"type":"string"},"type":"array","key$":"starships"},"created":{"description":"The ISO 8601 date format of the time that this resource was created","format":"date-time","type":"string","key$":"created"},"edited":{"description":"The ISO 8601 date format of the time that this resource was edited","format":"date-time","type":"string","key$":"edited"},"url":{"description":"The hypermedia URL of this resource","type":"string","key$":"url"}},"x-ref":"#/components/schemas/Person","index$":0},"example":{"name":"Luke Skywalker","height":"172","mass":"77","hair_color":"blond","skin_color":"fair","eye_color":"blue","birth_year":"19BBY","gender":"male","homeworld":"https://swapi.dev/api/planets/1/","films":["https://swapi.dev/api/films/2/","https://swapi.dev/api/films/6/","https://swapi.dev/api/films/3/","https://swapi.dev/api/films/1/","https://swapi.dev/api/films/7/"],"species":["https://swapi.dev/api/species/1/"],"vehicles":["https://swapi.dev/api/vehicles/14/","https://swapi.dev/api/vehicles/30/"],"starships":["https://swapi.dev/api/starships/12/","https://swapi.dev/api/starships/22/"],"created":"2014-12-09T13:50:51.644000Z","edited":"2014-12-20T21:17:56.891000Z","url":"https://swapi.dev/api/people/1/"}}}},"404":{"description":"Person not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"ID of the person to retrieve","schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
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
  
