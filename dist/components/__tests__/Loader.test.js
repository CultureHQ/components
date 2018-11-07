"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Loader = _interopRequireDefault(require("../Loader"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Loaded = function Loaded() {
  return _react.default.createElement("p", null, "Content loaded!");
};

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
          return expect(_react.default.createElement(_Loader.default, {
            loading: true
          })).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("passes on className", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, {
    loading: true,
    className: "loader"
  }, _react.default.createElement(Loaded, null)));
  expect(component.find(".chq-ldr")).toHaveLength(1);
  expect(component.find(".chq-ldr").hasClass("loader")).toBe(true);
});
test("renders a placeholder if loading and not yet spinning", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, {
    loading: true
  }, _react.default.createElement(Loaded, null)));
  expect(component.find(Loaded)).toHaveLength(0);
  expect(component.hasClass("chq-ldr-sp")).toBe(false);
});
test("does not set a timeout if the loader is not loading", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, null, _react.default.createElement(Loaded, null)));
  expect(component.instance().timeout).toBe(undefined);
  expect(component.find(Loaded)).toHaveLength(1);
});
test("does not render a spinner if the loading is completed", function (done) {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, {
    loading: true
  }, _react.default.createElement(Loaded, null)));
  setTimeout(function () {
    component.update();
    expect(component.find(_Spinner.default)).toHaveLength(0);
    done();
  }, 250);
  component.setProps({
    loading: false
  });
});
test("renders a spinner if loading takes too long", function (done) {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, {
    loading: true
  }, _react.default.createElement(Loaded, null)));
  setTimeout(function () {
    component.update();
    expect(component.find(".chq-ldr").hasClass("chq-ldr-sp")).toBe(true);
    done();
  }, 250);
});
test("renders the content once it has loaded", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, {
    loading: true
  }, _react.default.createElement(Loaded, null)));
  component.setProps({
    loading: false
  });
  component.update();
  expect(component.find(Loaded)).toHaveLength(1);
});
test("clears the timeout if it exists when the component unmounts", function (done) {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, {
    loading: true
  }, _react.default.createElement(Loaded, null)));
  expect(component.instance().timeout).not.toBe(null);
  setTimeout(function () {
    component.instance().componentWillUnmount();
    expect(component.instance().timeout).toBe(null);
    done();
  }, 250);
});
test("clears the timeout when the component unmounts", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Loader.default, {
    loading: true
  }, _react.default.createElement(Loaded, null)));
  expect(component.instance().timeout).not.toBe(null);
  component.instance().componentWillUnmount();
  expect(component.instance().timeout).toBe(null);
});