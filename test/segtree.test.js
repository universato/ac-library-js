const {Segtree, ceil_pow2} = require('../lib/segtree');

class SegtreeNaive {
  constructor(arg = 0, op, e) {
    this.op = op;
    this.e = e;
    if(typeof arg === "number"){
      this.n = arg
      this.d = new Array(arg).fill(e);
    } else {
      this.n = arg.length
      this.d = arg
    }
  }
  set(p, x) {
    if(!(0 <= p && p < this.n)){ throw 'Invalid Parameter'; }
    this.d[p] = x;
  }
  get(p) {
    if(!(0 <= p && p < this.n)){ throw 'Invalid Parameter'; }
    return this.d[p];
  }
  prod(l, r) {
    if(!(0 <= l && l <= r && r <= this.n)){ throw 'Invalid Parameter'; }
    let res = this.e
    for(let i = l; i < r; i++){
      res = this.op(res, this.d[i])
    }
    return res
  }
  allProd(x) {
    if(typeof x !== 'undefined'){ throw 'Invalid Parameter'; }
    return this.prod(0, this.n)
  }
  maxRight(l, f){
    if(l < 0 || this.n < l){ throw 'Invalid Parameter'; }
    let sum = this.e;
    for(let i = l; i < this.n; i++){
      sum = this.op(sum, this.d[i]);
      if(!f(sum)){ return i }
    }
    return this.n;
  }
  minLeft(r, f){
    if(r < 0 || this.n < r){ throw 'Invalid Parameter'; }
    let sum = this.e;
    for (let i = r - 1; i >= 0; i--) {
        sum = this.op(this.d[i], sum);
        if (!f(sum)){ return i + 1; }
    }
    return 0;
  }
}


test('naive', () => {
  function op(a, b){
    if(a === '$'){ return b }
    if(b === '$'){ return a }
    return a + b;
  }
  for(let n = 0; n <= 20; n++){
    const seg0 = new SegtreeNaive(n, op, "$");
    const seg1 = new Segtree(n, op, "$");
    expect(seg1.allProd()).toBe(seg0.allProd());

    for(let i = 0; i < n; i++){
      let s = ""
      s += String.fromCharCode("a".charCodeAt() + i)
      seg0.set(i, s)
      seg1.set(i, s)
    }

    for(let i = 0; i < n; i++){
      expect(seg1.get(i)).toBe(seg0.get(i));
    }

    for(let l = 0; l <= n; l++){
      for(let r = l; r <= n; r++){
        expect(seg1.prod(l, r)).toBe(seg0.prod(l, r));
      }
    }
    expect(seg1.allProd()).toBe(seg0.allProd());

    let y = ''
    function leq_y(x){ x.size <= y.size }

    for(let l = 0; l <= n; l++){
      for(let r = l; r <= n; r++){
        y = seg1.prod(l, r);
        expect(seg1.maxRight(l, leq_y)).toBe(seg0.maxRight(l, leq_y));
      }
    }

    for(let l = 0; l <= n; l++){
      for(let r = l; r <= n; r++){
        y = seg1.prod(l, r);
        expect(seg1.minLeft(r, leq_y)).toBe(seg0.minLeft(r, leq_y));
      }
    }
  }
});


test('max number-init', () => {
  // let a = [1, 2, 3, 2, 1];
  function op(a,b){
    return a > b ? a : b;
  }
  const st = new Segtree(5, op, -Infinity);
  st.set(0, 1);
  st.set(1, 2);
  st.set(2, 3);
  st.set(3, 2);
  st.set(4, 1);

  expect(st.prod(1 - 1, 5)).toBe(3);
  function fff(v){ return v < 3 }
  expect(st.maxRight(2 - 1, fff) + 1).toBe(3);
  st.set(3 - 1, 1)
  expect(st.get(1)).toBe(2);
});

test('max array-init', () => {
  function op(a,b){
    return a > b ? a : b;
  }
  const a = [1, 2, 3, 2, 1];
  const st = new Segtree(a, op, -Infinity);

  expect(st.prod(1 - 1, 5)).toBe(3);
  function fff(v){ return v < 3 }
  expect(st.maxRight(2 - 1, fff) + 1).toBe(3);
  st.set(3 - 1, 1)
  expect(st.get(1)).toBe(2);
});

test('sum', () => {
  function op(x, y){ return x + y; }
  const st = new Segtree(10, op, 0);
  for(let i = 0; i < 10; i++){ st.set(i, i + 1) }

  expect(st.get(0)).toBe(1);
  expect(st.get(9)).toBe(10);
  expect(st.allProd()).toBe(55);
  expect(st.prod(0, 10)).toBe(55);
  expect(st.prod(1, 10)).toBe(54);
  expect(st.prod(0, 9)).toBe(45);
  expect(st.prod(0, 4)).toBe(10);
  expect(st.prod(3, 6)).toBe(15); // [4, 5, 6]

  expect(st.prod(0, 0)).toBe(0);
  expect(st.prod(1, 1)).toBe(0);
  expect(st.prod(9, 9)).toBe(0);

  st.set(4, 15);
  expect(st.allProd()).toBe(65);
  expect(st.prod(0, 10)).toBe(65);
  expect(st.prod(1, 10)).toBe(64);
  expect(st.prod(3, 6)).toBe(25); // [4, 15, 6]

  expect(st.prod(0, 0)).toBe(0);
  expect(st.prod(1, 1)).toBe(0);
  expect(st.prod(9, 9)).toBe(0);
});

test('max_right', () => {
  function op(x, y){ return x + y; }
  const st = new Segtree(7, op, 0);
  for(let i = 0; i <= 6; i++){ st.set(i, i) }

  // [0, 1, 2, 3,  4,  5,  6] i
  // [0, 1, 3, 6, 10, 15, 21] prod(0, i)
  // [t, t, t, f,  f,  f,  f] prod(0, i) < 5
  function ff(x){ return x < 5 }
  expect(st.maxRight(0, ff)).toBe(3);

  function gg(x){ return x <= 4 }
  expect(st.maxRight(4 , gg)).toBe(5);

  function hh(x){ return x <= 2 }
  expect(st.maxRight(3 , hh)).toBe(3);
});

// https://atcoder.jp/contests/abc185/tasks/abc185_f
test('xor number-init', () => {
  function op(x, y){ return x ^ y; }
  const st = new Segtree(3, op, 0);
  for(let i = 0; i < 3; i++){ st.set(i, i + 1) }

  expect(st.prod(1 - 1, 3 - 1 + 1)).toBe(0);
  expect(st.prod(2 - 1, 3 - 1 + 1)).toBe(1);

  st.set(2 - 1, st.get(2 - 1) ^ 3)
  expect(st.prod(2 - 1, 3 - 1 + 1)).toBe(2);
});

// https://atcoder.jp/contests/abc185/tasks/abc185_f
test('xor array-init', () => {
  function op(x, y){ return x ^ y; }
  const a = [1, 2, 3]
  const st = new Segtree(a, op, 0);

  expect(st.prod(1 - 1, 3 - 1 + 1)).toBe(0);
  expect(st.prod(2 - 1, 3 - 1 + 1)).toBe(1);

  st.set(2 - 1, st.get(2 - 1) ^ 3)
  expect(st.prod(2 - 1, 3 - 1 + 1)).toBe(2);
});


test('ceil_pow2', () => {
  expect(ceil_pow2(0)).toBe(0);
  expect(ceil_pow2(1)).toBe(0);
  expect(ceil_pow2(2)).toBe(1);
  expect(ceil_pow2(3)).toBe(2);
  expect(ceil_pow2(4)).toBe(2);
  expect(ceil_pow2(5)).toBe(3);
  expect(ceil_pow2(6)).toBe(3);
  expect(ceil_pow2(7)).toBe(3);
  expect(ceil_pow2(8)).toBe(3);
  expect(ceil_pow2(9)).toBe(4);
  expect(ceil_pow2(1 << 30)).toBe(30);
  // expect(ceil_pow2((1n << 30n) + 1n)).toBe(31);
});
