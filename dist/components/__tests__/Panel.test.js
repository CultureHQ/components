"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Panel = _interopRequireDefault(require("../Panel"));

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
          component = _react.default.createElement(_Panel.default, null, _react.default.createElement(_Panel.default.Heading, null, "Heading"), _react.default.createElement(_Panel.default.Body, null, "Body"), _react.default.createElement(_Panel.default.Footer, null, "Footer"));
          expect((0, _enzyme.mount)(component).find("div")).toHaveLength(4);
          _context.next = 4;
          return expect(component).toHaveNoViolations();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("Panel passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Panel.default, {
    className: "panel"
  }));
  expect(component.hasClass("chq-pan")).toBe(true);
  expect(component.hasClass("panel")).toBe(true);
});
test("PanelHeading passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Panel.default.Heading, {
    className: "panel-heading"
  }));
  expect(component.hasClass("chq-pan--hd")).toBe(true);
  expect(component.hasClass("panel-heading")).toBe(true);
});
test("PanelBody passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Panel.default.Body, {
    className: "panel-body"
  }));
  expect(component.hasClass("chq-pan--bd")).toBe(true);
  expect(component.hasClass("panel-body")).toBe(true);
});
test("PanelLoaderBody passes on className", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Panel.default.LoaderBody, {
    className: "panel-loader-body"
  }));
  expect(component.find(".chq-pan--bd")).toHaveLength(1);
  expect(component.hasClass("panel-loader-body")).toBe(true);
});
test("PanelFooter passes on className", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Panel.default.Footer, {
    className: "panel-footer"
  }));
  expect(component.hasClass("chq-pan--ft")).toBe(true);
  expect(component.hasClass("panel-footer")).toBe(true);
});
test("PanelLoaderBody handles loading", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Panel.default.LoaderBody, {
    loading: true
  }, "Loaded"));
  expect(component.text()).toEqual("");
  component.setProps({
    loading: false
  });
  expect(component.text()).toEqual("Loaded");
});