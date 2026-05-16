-- StarWars SDK error

local StarWarsError = {}
StarWarsError.__index = StarWarsError


function StarWarsError.new(code, msg, ctx)
  local self = setmetatable({}, StarWarsError)
  self.is_sdk_error = true
  self.sdk = "StarWars"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function StarWarsError:error()
  return self.msg
end


function StarWarsError:__tostring()
  return self.msg
end


return StarWarsError
