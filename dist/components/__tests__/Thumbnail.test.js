"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Thumbnail = _interopRequireDefault(require("../Thumbnail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test("renders without crashing",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var component;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          component = _react.default.createElement(_Thumbnail.default, {
            image: "https://robohash.org/1"
          });
          expect((0, _enzyme.shallow)(component).html()).toContain("div");
          _context.next = 4;
          return expect(component).toHaveNoViolations();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Thumbnail.default, {
    image: "https://robohash.org/1",
    className: "thumbnail"
  }));
  expect(component.hasClass("thumbnail")).toBe(true);
});