"use strict";

function keys(obj){ return Object.keys(obj); }
function values(obj){ return Object.values(obj); }
function arrayFromObject(obj){ return Object.entries(obj); }
function isEmptyObject(obj){ return !Object.keys(obj).length; }
function hasKey(obj, key){ return obj.hasOwnProperty(key); }
// function delete(obj){ return; }

module.exports = {
  keys,
  values,
  hasKey,
  arrayFromObject
}

// const keysOf = keys;
// const valuesOf = values;

// obj = { name: "Smith", age: 20 };
// console.log(keys(obj));
// console.log(values(obj));
// console.log(arrayFromObject(obj));
// console.log(hasKey(obj, "name"));
// console.log("toString" in obj);
