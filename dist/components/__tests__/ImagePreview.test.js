"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ImagePreview = _interopRequireDefault(require("../ImagePreview"));

var readImage = _interopRequireWildcard(require("../../utils/read-image"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test("reads image and loads it",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var component;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          readImage.default = jest.fn(function () {
            return Promise.resolve({
              src: "culturehq.png",
              styles: {
                height: "200px"
              }
            });
          });
          component = (0, _enzyme.mount)(_react.default.createElement(_ImagePreview.default, {
            preview: "culture.png"
          }));
          expect(component.find("img")).toHaveLength(0);
          _context.next = 5;
          return component.instance().enqueueLoad();

        case 5:
          component.update();
          expect(component.find("img")).toHaveLength(1);
          expect(component.find("img").prop("style")).toHaveProperty("height", "200px");

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("does not attempt to set state when unmounted while waiting",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var component, promise;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          readImage.default = jest.fn(function () {
            return new Promise(function (resolve) {
              return setTimeout(function () {
                return resolve({
                  src: "culturehq.png",
                  styles: {
                    height: "200px"
                  }
                });
              }, 200);
            });
          });
          component = (0, _enzyme.mount)(_react.default.createElement(_ImagePreview.default, {
            preview: "culture.png"
          }));
          expect(component.find("img")).toHaveLength(0);
          promise = component.instance().enqueueLoad();
          component.unmount();
          _context2.next = 7;
          return promise;

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test("references parent height if already loaded", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement("div", null, _react.default.createElement(_ImagePreview.default, {
    preview: "culturehq.png"
  })));
  component.find(_ImagePreview.default).instance().setState({
    src: "culturehq.png"
  });
  component.update();
  component.find(_ImagePreview.default).instance().enqueueLoad();
});