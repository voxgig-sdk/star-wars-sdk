

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { StarWarsSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('FilmEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when STAR_WARS_TEST_LIVE=TRUE.
  afterEach(liveDelay('STAR_WARS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = StarWarsSDK.test()
    const ent = testsdk.Film()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('film hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of StarWarsSDK.test(offline).Film().stream('list')) { }
    }, /offline/)

    for await (const _item of StarWarsSDK.test(offline).Film()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = StarWarsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Film().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of StarWarsSDK.test().Film().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new StarWarsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Film().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Film().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = StarWarsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Film().list({"page":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.STAR_WARS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'film.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"characters":{"a":true,"h":"Characters","n":"characters","r":false,"sh":"An array of people resource URLs that are in this film","t":"`$ARRAY`","key$":"characters","index$":0},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":false,"sh":"The ISO 8601 date format of the time that this resource was created","t":"`$STRING`","key$":"created","index$":1},"director":{"a":true,"h":"Director","n":"director","r":false,"sh":"The name of the director of this film","t":"`$STRING`","key$":"director","index$":2},"edited":{"a":true,"fo":"date-time","h":"Edited","n":"edited","r":false,"sh":"The ISO 8601 date format of the time that this resource was edited","t":"`$STRING`","key$":"edited","index$":3},"episode_id":{"a":true,"h":"Episode Id","n":"episode_id","r":false,"sh":"The episode number of this film","t":"`$INTEGER`","key$":"episode_id","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"opening_crawl":{"a":true,"h":"Opening Crawl","n":"opening_crawl","r":false,"sh":"The opening paragraphs at the beginning of this film","t":"`$STRING`","key$":"opening_crawl","index$":6},"planets":{"a":true,"h":"Planets","n":"planets","r":false,"sh":"An array of planet resource URLs that are in this film","t":"`$ARRAY`","key$":"planets","index$":7},"producer":{"a":true,"h":"Producer","n":"producer","r":false,"sh":"The name(s) of the producer(s) of this film","t":"`$STRING`","key$":"producer","index$":8},"release_date":{"a":true,"fo":"date","h":"Release Date","n":"release_date","r":false,"sh":"The release date of this film","t":"`$STRING`","key$":"release_date","index$":9},"species":{"a":true,"h":"Species","n":"species","r":false,"sh":"An array of species resource URLs that are in this film","t":"`$ARRAY`","key$":"species","index$":10},"starships":{"a":true,"h":"Starships","n":"starships","r":false,"sh":"An array of starship resource URLs that are in this film","t":"`$ARRAY`","key$":"starships","index$":11},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"The title of this film","t":"`$STRING`","key$":"title","index$":12},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"The hypermedia URL of this resource","t":"`$STRING`","key$":"url","index$":13},"vehicles":{"a":true,"h":"Vehicles","n":"vehicles","r":false,"sh":"An array of vehicle resource URLs that are in this film","t":"`$ARRAY`","key$":"vehicles","index$":14}},"id":{"field":"id","name":"id"},"name":"film","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /films","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/films","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"films"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /films/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/films/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"films"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"film","name__orig":"film","Name":"Film","name_":"film","name-":"film","NAME":"FILM","index$":0}, {"active":true,"entity":"film","key$":"BasicFilmFlow","kind":"basic","name":"BasicFilmFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"film_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"film_ref01","srcdatavar":"film_ref01_data","suffix":"_dt0"},"m":{"id":"film01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-film_ref01"}}],"index$":1}]}, 'Film', {"GET /films":{"protocol":"http","parameters":[{"name":"page","in":"query","description":"Page number for pagination","schema":{"type":"integer","default":1},"index$":0},{"name":"search","in":"query","description":"Search query to filter films by title","schema":{"type":"string"},"index$":1}]},"GET /films/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the film to retrieve","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
