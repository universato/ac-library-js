const { keys, values, hasKey } = require('../lib/object');

test('keys', () => {
  expect(keys({}).toString()).toBe([].toString());
  expect(keys({name: "Tanaka"}).toString()).toBe(["name"].toString());
});

test('values', () => {
  expect(values({}).toString()).toBe([].toString());
  expect(values({name: "Tanaka"}).toString()).toBe(["Tanaka"].toString());
});
