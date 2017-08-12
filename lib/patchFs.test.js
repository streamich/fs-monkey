'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chai = require('chai');

var _patchFs = require('./patchFs');

var _patchFs2 = _interopRequireDefault(_patchFs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('patchFs', function () {
    it('should overwrite the .readFileSync method', function () {
        var vol = {
            readFileSync: function readFileSync() {
                return 'foo';
            }
        };
        var fs = {};
        (0, _patchFs2.default)(vol, fs);
        (0, _chai.expect)(_typeof(fs.readFileSync)).to.equal('function');
        (0, _chai.expect)(fs.readFileSync()).to.equal('foo');
    });
    it('should copy constants', function () {
        var vol = {
            F_OK: 123
        };
        var fs = {};
        (0, _patchFs2.default)(vol, fs);
        (0, _chai.expect)(fs.F_OK).to.equal(vol.F_OK);
    });
});