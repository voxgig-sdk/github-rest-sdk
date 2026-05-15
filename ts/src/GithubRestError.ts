
import { Context } from './Context'


class GithubRestError extends Error {

  isGithubRestError = true

  sdk = 'GithubRest'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GithubRestError
}

