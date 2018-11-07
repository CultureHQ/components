"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

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
          component = _react.default.createElement(_Tooltip.default, {
            tip: "Tip"
          }, "Inner content");
          _context.next = 3;
          return expect(component).toHaveNoViolations();

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("resizes when the window resizes and dedups resize events", function (done) {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Tooltip.default, {
    tip: "Tip"
  }, "Inner content"));
  var recompute = jest.fn();
  component.instance().requestComputeOffsets = recompute;
  global.innerWidth = 200;
  global.dispatchEvent(new Event("resize"));
  global.dispatchEvent(new Event("resize"));
  global.dispatchEvent(new Event("resize"));
  setTimeout(function () {
    expect(recompute).toHaveBeenCalledTimes(1);
    component.unmount();
    done();
  }, 1000);
});
test("ensures the bubble is not too far to the left", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Tooltip.default, {
    tip: "Tip"
  }, "Inner content"));
  var style = {};
  component.instance().bubble.current = {
    offsetWidth: 300,
    style: style
  };
  component.instance().computeOffsets();
  expect(style.left).toEqual("10px");
});
test("does not break when one of the refs is null", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Tooltip.default, {
    tip: "Tip"
  }, "Inner content"));
  component.instance().bubble.current = null;
  expect(function () {
    return component.instance().computeOffsets();
  }).not.toThrow();
});