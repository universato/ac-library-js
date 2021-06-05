const floorSum = require('../lib/floor_sum_bigint');

test('ALPC C', () => {
  expect(floorSum(4n, 10n, 6n, 3n)).toBe(3n);
  expect(floorSum(6n, 5n, 4n, 3n)).toBe(13n);
  expect(floorSum(1n, 1n, 0n, 0n)).toBe(0n);
  expect(floorSum(31415n,92653n, 58979n, 32384n)).toBe(314095480n);
  expect(floorSum(1000000000n, 1000000000n, 999999999n,999999999n)).toBe(499999999500000000n);
});
