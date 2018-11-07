"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Checklist = _interopRequireDefault(require("../Checklist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test("has no violations",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var component;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          component = _react.default.createElement(_Checklist.default, null, _react.default.createElement(_Checklist.default.Item, null, "This is unchecked."), _react.default.createElement(_Checklist.default.Item, {
            checked: true
          }, "This is checked."));
          _context.next = 3;
          return expect(component).toHaveNoViolations();

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("renders without crashing", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Checklist.default, null));
  expect(component.type()).toEqual("div");
});
test("passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Checklist.default, {
    className: "checklist"
  }));
  expect(component.hasClass("checklist")).toBe(true);
});
test("renders an item without crashing", function () {
  var message = "checklist item";
  var component = (0, _enzyme.mount)(_react.default.createElement(_Checklist.default.Item, {
    checked: true
  }, message));
  expect(component.find("button").hasClass("chq-cmk-ck")).toBe(true);
  expect(component.find("button").text()).toContain(message);
});