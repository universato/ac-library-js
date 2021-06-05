const DSU = require('../lib/dsu');

test('ALPC A', () => {
  const d = new DSU(4);
  expect(d.same(0, 1)).toBe(false);
  d.merge(0, 1);
  d.merge(2, 3);
  expect(d.same(0, 1)).toBe(true);
  expect(d.same(1, 2)).toBe(false);
  d.merge(0, 2);
  expect(d.same(1, 3)).toBe(true);
});
