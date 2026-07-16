# GithubRest SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class GithubRestContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = GithubRestHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = GithubRestHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = GithubRestControl.new
    ctrl_raw = GithubRestHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
      @ctrl.actor = ctrl_raw["actor"] if ctrl_raw.key?("actor")
      @ctrl.paging = ctrl_raw["paging"] if ctrl_raw["paging"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = GithubRestHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = GithubRestHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = GithubRestHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = GithubRestHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = GithubRestHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = GithubRestHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = GithubRestHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = GithubRestHelpers.to_map(GithubRestHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = GithubRestHelpers.to_map(GithubRestHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = GithubRestHelpers.to_map(GithubRestHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = GithubRestHelpers.to_map(GithubRestHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = GithubRestHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = GithubRestHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(GithubRestSpec) ? sp : basectx&.spec

    r = GithubRestHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(GithubRestResult) ? r : basectx&.result

    rp = GithubRestHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(GithubRestResponse) ? rp : basectx&.response

    opname = GithubRestHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    # Cache key is `<entity>:<opname>` so two entities with the same op
    # (e.g. both have a "list") get distinct cached Operations. Keying
    # on opname alone caused the first-resolved entity's points to be
    # served to every subsequent entity's call.
    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    cache_key = "#{entname}:#{opname}"
    return @opmap[cache_key] if @opmap[cache_key]
    return GithubRestOperation.new({}) if opname.empty?

    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = GithubRestOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[cache_key] = op
    op
  end

  def make_error(code, msg)
    GithubRestError.new(code, msg, self)
  end
end
