"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Badge = _interopRequireDefault(require("../Badge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test("has no violations",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return expect(_react.default.createElement(_Badge.default, null, "This is a badge.")).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("renders without crashing", function () {
  var message = "This is a badge.";
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Badge.default, null, message));
  expect(component.html()).toContain(message);
});
test("passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Badge.default, {
    className: "badge"
  }));
  expect(component.hasClass("badge")).toBe(true);
  expect(component.hasClass("chq-bdg")).toBe(true);
});
test("passes on onClick", function () {
  var clicked = false;

  var onClick = function onClick() {
    clicked = true;
  };

  var component = (0, _enzyme.shallow)(_react.default.createElement(_Badge.default, {
    onClick: onClick
  }));
  expect(clicked).toBe(false);
  component.simulate("click");
  expect(clicked).toBe(true);
});