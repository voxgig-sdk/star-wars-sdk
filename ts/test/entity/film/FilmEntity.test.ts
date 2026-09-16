

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


describe('FilmEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsSDK.test()
    const ent = testsdk.Film()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'film.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"characters","req":false,"short":"An array of people resource URLs that are in this film","type":"`$ARRAY`","index$":0},{"active":true,"format":"date-time","name":"created","req":false,"short":"The ISO 8601 date format of the time that this resource was created","type":"`$STRING`","index$":1},{"active":true,"name":"director","req":false,"short":"The name of the director of this film","type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"edited","req":false,"short":"The ISO 8601 date format of the time that this resource was edited","type":"`$STRING`","index$":3},{"active":true,"name":"episode_id","req":false,"short":"The episode number of this film","type":"`$INTEGER`","index$":4},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"opening_crawl","req":false,"short":"The opening paragraphs at the beginning of this film","type":"`$STRING`","index$":6},{"active":true,"name":"planets","req":false,"short":"An array of planet resource URLs that are in this film","type":"`$ARRAY`","index$":7},{"active":true,"name":"producer","req":false,"short":"The name(s) of the producer(s) of this film","type":"`$STRING`","index$":8},{"active":true,"format":"date","name":"release_date","req":false,"short":"The release date of this film","type":"`$STRING`","index$":9},{"active":true,"name":"species","req":false,"short":"An array of species resource URLs that are in this film","type":"`$ARRAY`","index$":10},{"active":true,"name":"starships","req":false,"short":"An array of starship resource URLs that are in this film","type":"`$ARRAY`","index$":11},{"active":true,"name":"title","req":false,"short":"The title of this film","type":"`$STRING`","index$":12},{"active":true,"name":"url","req":false,"short":"The hypermedia URL of this resource","type":"`$STRING`","index$":13},{"active":true,"name":"vehicles","req":false,"short":"An array of vehicle resource URLs that are in this film","type":"`$ARRAY`","index$":14}],"id":{"field":"id","name":"id"},"name":"film","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /films","json":"{\"operationId\":\"getAllFilms\",\"parameters\":[{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"default\":1,\"type\":\"integer\"}},{\"description\":\"Search query to filter films by title\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"description\":\"The total number of films\",\"type\":\"integer\"},\"next\":{\"description\":\"The URL for the next page of results\",\"nullable\":true,\"type\":\"string\"},\"previous\":{\"description\":\"The URL for the previous page of results\",\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"characters\":{\"description\":\"An array of people resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"director\":{\"description\":\"The name of the director of this film\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"episode_id\":{\"description\":\"The episode number of this film\",\"type\":\"integer\"},\"opening_crawl\":{\"description\":\"The opening paragraphs at the beginning of this film\",\"type\":\"string\"},\"planets\":{\"description\":\"An array of planet resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"producer\":{\"description\":\"The name(s) of the producer(s) of this film\",\"type\":\"string\"},\"release_date\":{\"description\":\"The release date of this film\",\"format\":\"date\",\"type\":\"string\"},\"species\":{\"description\":\"An array of species resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"starships\":{\"description\":\"An array of starship resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"The title of this film\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"},\"vehicles\":{\"description\":\"An array of vehicle resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/films","segments":[{"lit":"films"}],"select":{"exist":["page","search"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /films/{id}","json":"{\"operationId\":\"getFilmById\",\"parameters\":[{\"description\":\"ID of the film to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"characters\":{\"description\":\"An array of people resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"created\":{\"description\":\"The ISO 8601 date format of the time that this resource was created\",\"format\":\"date-time\",\"type\":\"string\"},\"director\":{\"description\":\"The name of the director of this film\",\"type\":\"string\"},\"edited\":{\"description\":\"The ISO 8601 date format of the time that this resource was edited\",\"format\":\"date-time\",\"type\":\"string\"},\"episode_id\":{\"description\":\"The episode number of this film\",\"type\":\"integer\"},\"opening_crawl\":{\"description\":\"The opening paragraphs at the beginning of this film\",\"type\":\"string\"},\"planets\":{\"description\":\"An array of planet resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"producer\":{\"description\":\"The name(s) of the producer(s) of this film\",\"type\":\"string\"},\"release_date\":{\"description\":\"The release date of this film\",\"format\":\"date\",\"type\":\"string\"},\"species\":{\"description\":\"An array of species resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"starships\":{\"description\":\"An array of starship resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"The title of this film\",\"type\":\"string\"},\"url\":{\"description\":\"The hypermedia URL of this resource\",\"type\":\"string\"},\"vehicles\":{\"description\":\"An array of vehicle resource URLs that are in this film\",\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Film not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/films/{id}","segments":[{"lit":"films"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"film","name__orig":"film","Name":"Film","name_":"film","name-":"film","NAME":"FILM","index$":0}, {"active":true,"entity":"film","key$":"BasicFilmFlow","kind":"basic","name":"BasicFilmFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"film_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"film_ref01","srcdatavar":"film_ref01_data","suffix":"_dt0"},"match":{"id":"film01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-film_ref01"}}],"index$":1}]}, 'Film')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let film_ref01_data = Object.values(setup.data.existing.film)[0] as any

    // LIST
    const film_ref01_ent = client.Film()
    const film_ref01_match: any = {}

    const film_ref01_list = (await film_ref01_ent.list(film_ref01_match)).map((e: any) => e.data())


    // LOAD
    const film_ref01_match_dt0: any = {}
    film_ref01_match_dt0.id = film_ref01_data.id
    const film_ref01_data_dt0 = (await film_ref01_ent.load(film_ref01_match_dt0)).data()
    assert(film_ref01_data_dt0.id === film_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/film/FilmTestData.json')

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
    ['film01','film02','film03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'STAR_WARS_TEST_FILM_ENTID': idmap,
    'STAR_WARS_TEST_LIVE': 'FALSE',
    'STAR_WARS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['STAR_WARS_TEST_FILM_ENTID']

  const live = 'TRUE' === env.STAR_WARS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['STAR_WARS_TEST_FILM_ENTID']
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
  
