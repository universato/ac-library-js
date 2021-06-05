"use strict";

function floorSumN(n, m, a, b) {
  let ans = 0;
  if (a >= m) {
    ans += (n - 1) * n * Math.floor(a / m) / 2;
    a %= m;
  }
  if (b >= m) {
    ans += n * Math.floor(b / m);
    b %= m;
  }
  let y_max = Math.floor((a * n + b) / m);
  let x_max = (y_max * m - b);
  if (y_max == 0) return ans;

  ans += (n - Math.ceil(x_max / a)) * y_max;
  ans += floorSumN(y_max, a, m, (a - x_max % a) % a);
  return ans;
}

module.exports = floorSumN;
