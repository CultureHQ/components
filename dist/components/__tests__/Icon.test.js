"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Icon = _interopRequireDefault(require("../Icon"));

var _icons = require("../../icons.json");

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
          return expect(_react.default.createElement(_Icon.default, {
            icon: "checkmark"
          })).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("renders without crashing",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var component;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _enzyme.mount)(_react.default.createElement(_Icon.default, {
            icon: "checkmark"
          }));

        case 2:
          component = _context2.sent;
          expect(component.find("path")).toHaveLength(0);
          _context2.next = 6;
          return component.instance().componentDidMount();

        case 6:
          component.update();
          expect(component.find("path")).toHaveLength(1);
          component.unmount();

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test("passes on className",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var component;
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _enzyme.mount)(_react.default.createElement(_Icon.default, {
            icon: "checkmark",
            className: "icon"
          }));

        case 2:
          component = _context3.sent;
          expect(component.hasClass("icon")).toBe(true);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
test("updates the icon when the prop changes",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4() {
  var component;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _enzyme.mount)(_react.default.createElement(_Icon.default, {
            icon: "checkmark"
          }));

        case 2:
          component = _context4.sent;
          component.setProps({
            icon: "close"
          });
          _context4.next = 6;
          return component.instance().loadIcon();

        case 6:
          component.update();
          expect(component.state().d).toEqual(_icons.close.join(" "));

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
test("does not attempt to set state once it been unmounted",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5() {
  var component;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _enzyme.mount)(_react.default.createElement(_Icon.default, {
            icon: "checkmark"
          }));

        case 2:
          component = _context5.sent;
          component.instance().loadIcon();
          component.unmount();

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));