// require lambda-tester and our handler
const LambdaTester = require('lambda-tester');
const mainHandler = require('../index.js').handler;
const faker = require('faker');

describe('env', () => {
  test('event not set', () =>
    LambdaTester(mainHandler)
      .event()
      .expectFail((err) => {
        expect(err.message).toEqual('EVENT IS NOT DEFINED');
      }));

  test('test mail gets sent', () =>
    LambdaTester(mainHandler)
      .event({
        data: {
          subject: faker.lorem.sentence(),
          text: faker.lorem.paragraphs(),
          html: '<p>' + faker.lorem.paragraphs() + '</p>',
        },
      })
      .expectSucceed());

  test('test subject not set', () =>
    LambdaTester(mainHandler)
      .event({
        data: {
          text: faker.lorem.paragraphs(),
          html: '<p>' + faker.lorem.paragraphs() + '</p>',
        },
      })
      .expectFail());

  test('test text not set', () =>
    LambdaTester(mainHandler)
      .event({
        data: {
          subject: faker.lorem.sentence(),
          html: '<p>' + faker.lorem.paragraphs() + '</p>',
        },
      })
      .expectFail());

  test('test html not set', () =>
    LambdaTester(mainHandler)
      .event({
        data: {
          subject: faker.lorem.sentence(),
          text: faker.lorem.paragraphs(),
        },
      })
      .expectFail());
});
