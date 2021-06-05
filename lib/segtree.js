"use strict";

function ceil_pow2(n) {
  let x = 0;
  while ((1 << x) < n) x++;
  return x;
}

class Segtree {
  constructor(arg = 0, op, e) {
    this.op = op;
    this.e = e;
    if(typeof arg === "number"){
      this.n = arg;
      this.log = ceil_pow2(this.n);
      this.size = 1 << this.log;
      this.d = new Array(this.size * 2).fill(e);
    }else{
      this.n = arg.length;
      this.log = ceil_pow2(this.n)
      this.size = 1 << this.log;
      this.d = new Array(this.size * 2).fill(e);
      for (let i = 0; i < this.n; i++){ this.d[this.size + i] = arg[i]; }
      for (let i = this.size - 1; i >= 1; i--) { this.update(i); }
    }
  }

  // 0 <= p < n
  set(p, x) {
    if(!(0 <= p && p < this.n)){ throw 'Invalid Parameter'; }
    p += this.size;
    this.d[p] = x;
    for (let i = 1; i <= this.log; i++){ this.update(p >> i) }
    return x;
  }
  get(p) {
    if(!(0 <= p && p < this.n)){ throw 'Invalid Parameter'; }
    return this.d[p + this.size];
  }
  prod(l, r) {
    if(!(0 <= l && l <= r && r <= this.n)){ throw 'Invalid Parameter'; }
    if(l === r){ return this.e }
    let sml = this.e;
    let smr = this.e;
    l += this.size;
    r += this.size;

    while (l < r) {
      if (l & 1){ sml = this.op(sml, this.d[l++]); }
      if (r & 1){ smr = this.op(this.d[--r], smr); }
        l >>= 1;
        r >>= 1;
    }
    return this.op(sml, smr);
  }
  allProd(x) {
    if(typeof x !== 'undefined'){ throw 'Invalid Parameter'; }
    return this.d[1];
  }
  update(k) { this.d[k] = this.op(this.d[2 * k], this.d[2 * k + 1]); }

  maxRight(l, f){
    if(l < 0 || this.n < l){ throw 'Invalid Parameter'; }
    if(l === this.n){ return this.n; }

    l += this.size;
    let sm = this.e;
    do {
      while (l % 2 == 0){ l >>= 1; }
      if (!f(this.op(sm, this.d[l]))) {
        while (l < this.size) {
          l = 2 * l;
          if (f(this.op(sm, this.d[l]))) {
            sm = this.op(sm, this.d[l]);
            l++;
          }
        }
        return l - this.size;
      }
      sm = this.op(sm, this.d[l]);
      l++;
    } while ((l & -l) !== l)

    return this.n;
  }
  minLeft(r, f){
    if(r < 0 || this.n < r){ throw 'Invalid Parameter'; }
    if(r === 0){ return 0 }

    r += this.size;
    let sm = this.e;
    do {
      r--;
      while (r > 1 && (r % 2)){ r >>= 1; }
      if (!f(this.op(this.d[r], sm))) {
        while (r < this.size) {
          r = (2 * r + 1);
          if (f(this.op(this.d[r], sm))) {
            sm = this.op(this.d[r], sm);
            r--;
          }
        }
        return r + 1 - this.size;
      }
      sm = this.op(this.d[r], sm);
    } while ((r & -r) != r);
    return 0;
  }
  leaf() {
    const size = this.size
    return this.d.splice(size, size)
  }
}

module.exports = {Segtree, ceil_pow2};
