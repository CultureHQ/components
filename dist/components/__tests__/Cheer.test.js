"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Cheer = _interopRequireDefault(require("../Cheer"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

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
          return expect(_react.default.createElement(_Cheer.default, null)).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("passes on className", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Cheer.default, {
    className: "cheer"
  }));
  expect(component.find("svg").hasClass("cheer")).toBe(true);
  expect(component.find("svg").hasClass("chq-chr")).toBe(true);
});
test("allows you to pass different colors", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Cheer.default, {
    color: "yellow"
  }));
  expect(component.find("svg").hasClass("chq-chr-yw")).toBe(true);
  expect(component.find("svg").hasClass("chq-chr")).toBe(true);
});
test("renders a tooltip if you pass a name", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Cheer.default, {
    name: "Harry"
  }));
  expect(component.find(_Tooltip.default)).toHaveLength(1);
});
test("adds the animation class if the pop prop is passed", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Cheer.default, {
    pop: true
  }));
  expect(component.find("svg").hasClass("chq-chr-pp")).toBe(true);
});