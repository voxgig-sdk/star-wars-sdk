
import { Context } from './Context'


class StarWarsError extends Error {

  isStarWarsError = true

  sdk = 'StarWars'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  StarWarsError
}

