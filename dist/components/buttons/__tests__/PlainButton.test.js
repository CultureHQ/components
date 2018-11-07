"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _PlainButton = _interopRequireDefault(require("../PlainButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test("renders without crashing",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var message, component;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          message = "This is a button.";
          component = _react.default.createElement(_PlainButton.default, null, message);
          expect((0, _enzyme.shallow)(component).html()).toContain(message);
          _context.next = 5;
          return expect(component).toHaveNoViolations();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_PlainButton.default, {
    className: "plain-button"
  }));
  expect(component.hasClass("plain-button")).toBe(true);
  expect(component.hasClass("chq-pbn")).toBe(true);
});