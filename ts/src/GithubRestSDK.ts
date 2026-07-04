// GithubRest Ts SDK

import { BranchEntity } from './entity/BranchEntity'
import { CommitEntity } from './entity/CommitEntity'
import { GistEntity } from './entity/GistEntity'
import { IssueEntity } from './entity/IssueEntity'
import { NotificationEntity } from './entity/NotificationEntity'
import { OrgEntity } from './entity/OrgEntity'
import { PullEntity } from './entity/PullEntity'
import { RateLimitEntity } from './entity/RateLimitEntity'
import { RepoEntity } from './entity/RepoEntity'
import { SearchEntity } from './entity/SearchEntity'
import { UserEntity } from './entity/UserEntity'

export type * from './GithubRestTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { GithubRestEntityBase } from './GithubRestEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class GithubRestSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _branch?: BranchEntity

  // Idiomatic facade: `client.branch.list()` / `client.branch.load({ id })`.
  get branch(): BranchEntity {
    return (this._branch ??= new BranchEntity(this, undefined))
  }

  /** @deprecated Use `client.branch` instead. */
  Branch(data?: any) {
    const self = this
    return new BranchEntity(self,data)
  }


  _commit?: CommitEntity

  // Idiomatic facade: `client.commit.list()` / `client.commit.load({ id })`.
  get commit(): CommitEntity {
    return (this._commit ??= new CommitEntity(this, undefined))
  }

  /** @deprecated Use `client.commit` instead. */
  Commit(data?: any) {
    const self = this
    return new CommitEntity(self,data)
  }


  _gist?: GistEntity

  // Idiomatic facade: `client.gist.list()` / `client.gist.load({ id })`.
  get gist(): GistEntity {
    return (this._gist ??= new GistEntity(this, undefined))
  }

  /** @deprecated Use `client.gist` instead. */
  Gist(data?: any) {
    const self = this
    return new GistEntity(self,data)
  }


  _issue?: IssueEntity

  // Idiomatic facade: `client.issue.list()` / `client.issue.load({ id })`.
  get issue(): IssueEntity {
    return (this._issue ??= new IssueEntity(this, undefined))
  }

  /** @deprecated Use `client.issue` instead. */
  Issue(data?: any) {
    const self = this
    return new IssueEntity(self,data)
  }


  _notification?: NotificationEntity

  // Idiomatic facade: `client.notification.list()` / `client.notification.load({ id })`.
  get notification(): NotificationEntity {
    return (this._notification ??= new NotificationEntity(this, undefined))
  }

  /** @deprecated Use `client.notification` instead. */
  Notification(data?: any) {
    const self = this
    return new NotificationEntity(self,data)
  }


  _org?: OrgEntity

  // Idiomatic facade: `client.org.list()` / `client.org.load({ id })`.
  get org(): OrgEntity {
    return (this._org ??= new OrgEntity(this, undefined))
  }

  /** @deprecated Use `client.org` instead. */
  Org(data?: any) {
    const self = this
    return new OrgEntity(self,data)
  }


  _pull?: PullEntity

  // Idiomatic facade: `client.pull.list()` / `client.pull.load({ id })`.
  get pull(): PullEntity {
    return (this._pull ??= new PullEntity(this, undefined))
  }

  /** @deprecated Use `client.pull` instead. */
  Pull(data?: any) {
    const self = this
    return new PullEntity(self,data)
  }


  _rate_limit?: RateLimitEntity

  // Idiomatic facade: `client.rate_limit.list()` / `client.rate_limit.load({ id })`.
  get rate_limit(): RateLimitEntity {
    return (this._rate_limit ??= new RateLimitEntity(this, undefined))
  }

  /** @deprecated Use `client.rate_limit` instead. */
  RateLimit(data?: any) {
    const self = this
    return new RateLimitEntity(self,data)
  }


  _repo?: RepoEntity

  // Idiomatic facade: `client.repo.list()` / `client.repo.load({ id })`.
  get repo(): RepoEntity {
    return (this._repo ??= new RepoEntity(this, undefined))
  }

  /** @deprecated Use `client.repo` instead. */
  Repo(data?: any) {
    const self = this
    return new RepoEntity(self,data)
  }


  _search?: SearchEntity

  // Idiomatic facade: `client.search.list()` / `client.search.load({ id })`.
  get search(): SearchEntity {
    return (this._search ??= new SearchEntity(this, undefined))
  }

  /** @deprecated Use `client.search` instead. */
  Search(data?: any) {
    const self = this
    return new SearchEntity(self,data)
  }


  _user?: UserEntity

  // Idiomatic facade: `client.user.list()` / `client.user.load({ id })`.
  get user(): UserEntity {
    return (this._user ??= new UserEntity(this, undefined))
  }

  /** @deprecated Use `client.user` instead. */
  User(data?: any) {
    const self = this
    return new UserEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new GithubRestSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return GithubRestSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'GithubRest' }
  }

  toString() {
    return 'GithubRest ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = GithubRestSDK


export {
  stdutil,

  BaseFeature,
  GithubRestEntityBase,

  GithubRestSDK,
  SDK,
}


