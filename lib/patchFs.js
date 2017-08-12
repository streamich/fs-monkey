'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = patchFs;

var _lists = require('./util/lists');

function patchFs(vol) {
    var fs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : require('fs');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _lists.fsProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;

            if (typeof vol[prop] !== 'undefined') fs[prop] = vol[prop];
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (typeof vol.StatWatcher === 'function') {
        fs.StatWatcher = vol.StatWatcher.bind(null, vol);
    }
    if (typeof vol.FSWatcher === 'function') {
        fs.FSWatcher = vol.FSWatcher.bind(null, vol);
    }
    if (typeof vol.ReadStream === 'function') {
        fs.ReadStream = vol.ReadStream.bind(null, vol);
    }
    if (typeof vol.WriteStream === 'function') {
        fs.WriteStream = vol.WriteStream.bind(null, vol);
    }

    if (typeof vol._toUnixTimestamp === 'function') fs._toUnixTimestamp = vol._toUnixTimestamp.bind(vol);

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = _lists.fsAsyncMethods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var method = _step2.value;

            if (typeof vol[method] === 'function') fs[method] = vol[method].bind(vol);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = _lists.fsSyncMethods[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _method = _step3.value;

            if (typeof vol[_method] === 'function') fs[_method] = vol[_method].bind(vol);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
};