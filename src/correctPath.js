const isWin = process.platform === 'win32';

/*!
 * removeTrailingSeparator <https://github.com/darsain/remove-trailing-separator>
 *
 * Inlined from:
 * Copyright (c) darsain.
 * Released under the ISC License.
 */
function removeTrailingSeparator(str) {
	let i = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
}

function isSeparator(str, i) {
    let char = str[i];
    return i > 0 && (char === '/' || (isWin && char === '\\'));
}

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Inlined from:
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
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

/*!
 * unixify <https://github.com/jonschlinkert/unixify>
 * 
 * Inlined from:
 * Copyright (c) 2014, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
export function unixify(filepath, stripTrailing = true) {
  if(isWin) {
    filepath = normalizePath(filepath, stripTrailing);
    return filepath.replace(/^([a-zA-Z]+:|\.\/)/, '');
  }
  return filepath;
}

/*
* Corrects a windows path to unix format (including \\?\c:...)
*/
export function correctPath(filepath) {
    return unixify(filepath.replace(/^\\\\\?\\.:\\/,'\\'));
}

export function isWindowsPath(filepath) {
  if (filepath && filepath.length >= 3) {
    
    // UNC-style path (\\...) -- assume it is a windows-style path
    if (filepath.charCodeAt(0) === 92 && filepath.charCodeAt(1) === 92) {
      return true;
    }
    
    // is it '[driveletter]:\'
    if( filepath.charCodeAt(1) == 58 && filepath.charCodeAt(2) === 92 ) {  
      var code = filepath.charCodeAt(0); 
      return ((code >= 65/*A*/ && code <= 90/*Z*/) || (code >= 97/*a*/ && code <= 122/*z*/))
    }
  }
  return false;
}