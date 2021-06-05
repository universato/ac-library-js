const { chr, ord, chars, capitalize, isEmptyString, reverseString } = require('../lib/string');

test('chr', () => {
  expect(chr(65)).toBe("A");
  expect(chr(97)).toBe("a");
});

test('ord', () => {
  expect(ord('A')).toBe(65);
  expect(ord('a')).toBe(97);
});

test('chars', () => {
  expect(chars("").toString()).toBe([].toString());
  expect(chars("Hello").toString()).toBe(['H', 'e', 'l', 'l', 'o'].toString());
});

test('capitalize', () => {
  expect(capitalize("")).toBe("");
  expect(capitalize("a")).toBe("A");
  expect(capitalize("Z")).toBe("Z");
  expect(capitalize("hello")).toBe("Hello");
  expect(capitalize("HeLLO")).toBe("Hello");
  expect(capitalize("heLLo")).toBe("Hello");
});

test('reverseString', () => {
  expect(reverseString("")).toBe("");
  expect(reverseString("a")).toBe("a");
  expect(reverseString("ABC")).toBe("CBA");
});

test('isEmptyString', () => {
  expect(isEmptyString("")).toBe(true);
  expect(isEmptyString("a")).toBe(false);
  expect(isEmptyString("ABC")).toBe(false);
});
