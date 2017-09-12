'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unixify = unixify;
exports.correctPath = correctPath;
exports.isWindowsPath = isWindowsPath;
var isWin = process.platform === 'win32';

function removeTrailingSeparator(str) {
  var i = str.length - 1;
  if (i < 2) {
    return str;
  }
  while (isSeparator(str, i)) {
    i--;
  }
  return str.substr(0, i + 1);
}

function isSeparator(str, i) {
  var char = str[i];
  return i > 0 && (char === '/' || isWin && char === '\\');
}

function normalizePath(str, stripTrailing) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/[\\\/]+/g, '/');
  if (stripTrailing !== false) {
    str = removeTrailingSeparator(str);
  }
  return str;
}

function unixify(filepath) {
  var stripTrailing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (isWin) {
    filepath = normalizePath(filepath, stripTrailing);
    return filepath.replace(/^([a-zA-Z]+:|\.\/)/, '');
  }
  return filepath;
}

function correctPath(filepath) {
  return unixify(filepath.replace(/^\\\\\?\\.:\\/, '\\'));
}

function isWindowsPath(filepath) {
  if (filepath && filepath.length >= 3) {
    if (filepath.charCodeAt(0) === 92 && filepath.charCodeAt(1) === 92) {
      return true;
    }

    if (filepath.charCodeAt(1) == 58 && filepath.charCodeAt(2) === 92) {
      var code = filepath.charCodeAt(0);
      return code >= 65 && code <= 90 || code >= 97 && code <= 122;
    }
  }
  return false;
}