const { sum, prod, isArray, isEmptyArray } = require('../lib/array');

test('sum', () => {
  expect(sum([])).toBe(0);
  expect(sum([3])).toBe(3);
  expect(sum([3, -4])).toBe(-1);
  expect(sum([1, 2, 3, 4, 5])).toBe(15);
});

test('prod', () => {
  expect(prod([])).toBe(1);
  expect(prod([3])).toBe(3);
  expect(prod([3, -4])).toBe(-12);
  expect(prod([1, 2, 3, 4, 5])).toBe(120);
});

test('isArray', () => {
  expect(isArray([])).toBe(true);
  expect(isArray([3])).toBe(true);
  expect(isArray([1, 2, 3, 4, 5])).toBe(true);
  expect(isArray("abc")).toBe(false);
  expect(isArray(1)).toBe(false);
  expect(isArray(undefined)).toBe(false);
  expect(isArray(true)).toBe(false);
});

test('isEmptyArray', () => {
  expect(isEmptyArray([])).toBe(true);
  expect(isEmptyArray([3])).toBe(false);
  expect(isEmptyArray([1, 2, 3, 4, 5])).toBe(false);
});
