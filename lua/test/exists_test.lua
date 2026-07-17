-- GithubRest SDK exists test

local sdk = require("github-rest_sdk")

describe("GithubRestSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
