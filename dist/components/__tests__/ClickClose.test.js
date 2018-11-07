"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ClickClose = _interopRequireDefault(require("../ClickClose"));

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
          return expect(_react.default.createElement(_ClickClose.default, null, "Test")).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("calls onClose when appropriate", function () {
  var events = {};
  window.addEventListener = jest.fn(function (event, callback) {
    events[event] = callback;
  });
  var received = false;

  var onClose = function onClose() {
    received = true;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement("div", null, _react.default.createElement(_ClickClose.default, {
    onClose: onClose,
    className: "inside"
  }, "Inside"), _react.default.createElement("div", {
    className: "outside"
  }, "Outside")));
  events.click({
    target: component.find("div.inside").instance()
  });
  expect(received).toBe(false);
  events.click({
    target: component.find("div.outside").instance()
  });
  expect(received).toBe(true);
});