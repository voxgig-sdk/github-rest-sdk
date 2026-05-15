package = "voxgig-sdk-github-rest"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/github-rest-sdk.git"
}
description = {
  summary = "GithubRest SDK for Lua",
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
    ["github-rest_sdk"] = "github-rest_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
