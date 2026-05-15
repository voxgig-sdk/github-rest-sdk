-- GithubRest SDK error

local GithubRestError = {}
GithubRestError.__index = GithubRestError


function GithubRestError.new(code, msg, ctx)
  local self = setmetatable({}, GithubRestError)
  self.is_sdk_error = true
  self.sdk = "GithubRest"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GithubRestError:error()
  return self.msg
end


function GithubRestError:__tostring()
  return self.msg
end


return GithubRestError
