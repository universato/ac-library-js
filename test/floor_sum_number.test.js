const floorSumN = require('../lib/floor_sum_number');

test('ALPC C', () => {
  expect(floorSumN(4, 10, 6, 3)).toBe(3);
  expect(floorSumN(6, 5, 4, 3)).toBe(13);
  expect(floorSumN(1, 1, 0, 0)).toBe(0);
  expect(floorSumN(31415, 92653, 58979, 32384)).toBe(314095480);
  expect(floorSumN(1000000000, 1000000000, 999999999,999999999)).toBe(499999999500000000);
});
