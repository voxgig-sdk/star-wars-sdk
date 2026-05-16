package = "voxgig-sdk-star-wars"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/star-wars-sdk.git"
}
description = {
  summary = "StarWars SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["star-wars_sdk"] = "star-wars_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
