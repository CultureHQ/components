"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Nav = _interopRequireDefault(require("../Nav"));

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
          return expect(_react.default.createElement(_Nav.default, null, "This is a nav.")).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("renders without crashing", function () {
  var message = "This is a nav.";
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Nav.default, null, message));
  expect(component.html()).toContain(message);
});
test("passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Nav.default, {
    className: "nav"
  }));
  expect(component.hasClass("nav")).toBe(true);
  expect(component.hasClass("chq-nav")).toBe(true);
});
test("hides the nav when the page is scrolled down", function () {
  window.pageYOffset = 25;
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Nav.default, null));
  expect(component.hasClass("chq-nav-hd")).toBe(false);
  window.pageYOffset = 50;
  component.instance().handleWindowScroll();
  component.update();
  expect(component.hasClass("chq-nav-hd")).toBe(true);
  component.unmount();
});
test("shows the nav when the page is scrolled up", function () {
  window.pageYOffset = 100;
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Nav.default, null));
  expect(component.hasClass("chq-nav-hd")).toBe(false);
  window.pageYOffset = 50;
  component.instance().handleWindowScroll();
  component.update();
  expect(component.hasClass("chq-nav-hd")).toBe(false);
  component.unmount();
});