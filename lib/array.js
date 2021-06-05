"use strict";

function isEmptyArray(ary) { return ary.length === 0; }
function sum(numbers) { return numbers.reduce((total, num) => { return total + num; }, 0); }
function prod(numbers) { return numbers.reduce((res, num) => { return res * num; }, 1); }
function isArray(obj){ return Array.isArray(obj); }
// function duplicateArray(ary){ return ary.slice(); }
function duplicateArray(ary){ return ary.concat(); }
function sort(ary){ return ary.sort((a, b) => a - b) }

module.exports = {
  sum,
  prod,
  isEmptyArray,
  isArray,
}
