"use strict";

function floorSum(n, m, a, b) {
  let ans = 0n;
  if (a >= m) {
    ans += (n - 1n) * n * (a / m) / 2n;
    a %= m;
  }
  if (b >= m) {
    ans += n * (b / m);
    b %= m;
  }
  let y_max = (a * n + b) / m;
  let x_max = (y_max * m - b);
  if (y_max == 0n) return ans;

  ans += (n - (x_max + a - 1n) / a) * y_max;
  ans += floorSum(y_max, a, m, (a - x_max % a) % a);
  return ans;
}

module.exports = floorSum;
