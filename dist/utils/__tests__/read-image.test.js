"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _readImage = _interopRequireWildcard(require("../read-image"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var imageOnload = null;
beforeAll(function () {
  Object.defineProperty(Image.prototype, "onload", {
    get: function get() {
      return this.onloadCallback;
    },
    set: function set(callback) {
      imageOnload = callback;
      this.onloadCallback = callback;
    }
  });
});

_fs.default.readdirSync(_path.default.join(__dirname, "images")).forEach(function (filename) {
  var _filename$split = filename.split("."),
      _filename$split2 = _slicedToArray(_filename$split, 1),
      name = _filename$split2[0];

  test("rotation ".concat(name),
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var filepath, buffer, file, blob, promise, _ref2, styles, _ROTATIONS$parseInt, transform, transformOrigin;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filepath = _path.default.join(__dirname, "images", filename);
            buffer = _fs.default.readFileSync(filepath);
            file = new File([buffer], filename);
            blob = new Blob([buffer]);
            promise = (0, _readImage.default)(file, blob, 200);
            imageOnload();
            _context.next = 8;
            return promise;

          case 8:
            _ref2 = _context.sent;
            styles = _ref2.styles;
            _ROTATIONS$parseInt = _readImage.ROTATIONS[parseInt(name, 10)], transform = _ROTATIONS$parseInt.transform, transformOrigin = _ROTATIONS$parseInt.transformOrigin;
            expect(styles.transform).toEqual(transform);
            expect(styles.transformOrigin).toEqual(transformOrigin);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
});

test("rotation for a .png",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var filepath, buffer, file, blob, promise, _ref4, styles;

  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          filepath = _path.default.join(__dirname, "..", "..", "..", "docs", "culture.png");
          buffer = _fs.default.readFileSync(filepath);
          file = new File([buffer], "culturehq.png");
          blob = new Blob([buffer]);
          promise = (0, _readImage.default)(file, blob, 200);
          imageOnload();
          _context2.next = 8;
          return promise;

        case 8:
          _ref4 = _context2.sent;
          styles = _ref4.styles;
          expect(styles.transform).toBe(undefined);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));