"use strict";

function chr(n){ return String.fromCharCode(n); }
function ord(c){ return c.charCodeAt();  }
function chars(str){ return str.split(''); }
// function chars(str){ return Array.from(str); }
function reverseString(s){ return s.split('').reverse().join(''); }
function isEmptyString(s){ return s.length === 0; }
function capitalize(s){ return s.length === 0 ? '' : s[0].toUpperCase() + s.toLowerCase().slice(1);  }

module.exports = {
  chr,
  ord,
  chars,
  reverseString,
  isEmptyString,
  capitalize,
}
