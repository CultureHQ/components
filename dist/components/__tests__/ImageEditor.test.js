"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ImageEditor = _interopRequireDefault(require("../ImageEditor"));

var _image = _interopRequireDefault(require("./__mocks__/image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mountEditor =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var onEdit,
        component,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onEdit = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
            component = (0, _enzyme.mount)(_react.default.createElement(_ImageEditor.default, {
              image: _image.default,
              onEdit: onEdit
            }));
            _context.next = 4;
            return component.instance().componentDidMount();

          case 4:
            component.instance().cropper.replace(_image.default);
            Object.defineProperty(component.instance().cropper.image, "naturalWidth", {
              value: 128
            });
            Object.defineProperty(component.instance().cropper.image, "naturalHeight", {
              value: 128
            });
            component.instance().cropper.image.onload();

            component.clickControl = function (label) {
              var button = component.find("ActionButton").findWhere(function (node) {
                return node.type() === "button" && node.props()["aria-label"] === label;
              });
              button.simulate("click");
            };

            component.clickSave = function () {
              var button = component.find("Button").findWhere(function (node) {
                return node.type() === "button" && node.text().trim() === "Save";
              });
              button.simulate("click");
            };

            return _context.abrupt("return", component);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function mountEditor() {
    return _ref.apply(this, arguments);
  };
}();

test("has no violations",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return expect(_react.default.createElement(_ImageEditor.default, {
            image: _image.default
          })).toHaveNoViolations();

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test("can click rotate left to modify image",
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
          return mountEditor();

        case 2:
          component = _context3.sent;
          component.clickControl("Rotate left");
          expect(component.instance().cropper.imageData.rotate).toEqual(-45);
          component.unmount();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
test("can click rotate right to modify image",
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
          return mountEditor();

        case 2:
          component = _context4.sent;
          component.clickControl("Rotate right");
          expect(component.instance().cropper.imageData.rotate).toEqual(45);
          component.unmount();

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));
test("can click zoom in to modify image",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee5() {
  var component, top;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return mountEditor();

        case 2:
          component = _context5.sent;
          top = component.instance().cropper.canvasData.top;
          component.clickControl("Zoom in");
          expect(component.instance().cropper.canvasData.top).toBeLessThan(top);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, this);
})));
test("can click zoom out to modify image",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee6() {
  var component, top;
  return regeneratorRuntime.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return mountEditor();

        case 2:
          component = _context6.sent;
          top = component.instance().cropper.canvasData.top;
          component.clickControl("Zoom out");
          expect(component.instance().cropper.canvasData.top).toBeGreaterThan(top);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6, this);
})));
test("can click save to save",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee7() {
  var response, onEdit, component;
  return regeneratorRuntime.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          response = null;

          onEdit = function onEdit(edited) {
            response = edited;
          };

          _context7.next = 4;
          return mountEditor(onEdit);

        case 4:
          component = _context7.sent;

          component.instance().cropper.getCroppedCanvas = function () {
            return {
              toDataURL: function toDataURL() {
                return _image.default;
              }
            };
          };

          component.clickSave();
          expect(response).not.toBe(null);

        case 8:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7, this);
})));
test("does not attempt to set state if already unmounted",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee8() {
  var component;
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return mountEditor();

        case 2:
          component = _context8.sent;
          component.instance().componentDidMount();
          component.unmount();

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8, this);
})));