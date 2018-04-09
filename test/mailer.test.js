// require lambda-tester and our handler
const LambdaTester = require("lambda-tester");
const mainHandler = require("../index.js").handler;
const faker = require("faker");

describe("env", function() {
  test("event not set", function() {
    return LambdaTester(mainHandler)
      .event()
      .expectFail(err => {
        expect(err.message).toEqual("EVENT IS NOT DEFINED");
      });
  });

  test("test mail gets sent", function() {
    return LambdaTester(mainHandler)
      .event({
        "info": {
          "subject": faker.lorem.sentence(),
          "text": faker.lorem.paragraphs(),
          "html": "<p>" + faker.lorem.paragraphs() + "</p>"
        }
      })
      .expectSucceed();
  });
});
