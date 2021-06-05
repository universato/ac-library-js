const FenwickTree = require('../lib/fenwick_tree');

test('ALPC B', () => {
  const fw = new FenwickTree(5);
  fw.add(0, 1)
  fw.add(1, 2)
  fw.add(2, 3)
  fw.add(3, 4)
  fw.add(4, 5)
  expect(fw.sum(0, 5)).toBe(15);
  expect(fw.sum(2, 4)).toBe(7);
  fw.add(3, 10)
  expect(fw.sum(0, 5)).toBe(25);
  expect(fw.sum(0, 3)).toBe(6);
});
