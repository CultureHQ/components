"use strict";

var _react = _interopRequireWildcard(require("react"));

var _enzyme = require("enzyme");

var _Hamburger = _interopRequireDefault(require("../Hamburger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HamburgerContainer = function HamburgerContainer(_ref) {
  var initialOpen = _ref.open;

  var _useState = (0, _react.useState)(initialOpen),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var onToggle = function onToggle() {
    return setOpen(function (prevOpen) {
      return !prevOpen;
    });
  };

  return _react.default.createElement(_Hamburger.default, {
    open: open,
    onToggle: onToggle
  });
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
          return expect(_react.default.createElement(_Hamburger.default, null)).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("renders without crashing", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Hamburger.default, null));
  expect(component.type()).toEqual("button");
});
test("passes on extra props", function () {
  var component = (0, _enzyme.shallow)(_react.default.createElement(_Hamburger.default, {
    className: "ham"
  }));
  expect(component.hasClass("ham")).toBe(true);
  expect(component.hasClass("chq-ham")).toBe(true);
});
test("functions as a controlled component", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(HamburgerContainer, null));
  component.find(_Hamburger.default).simulate("click");
  component.update();
  expect(component.find(_Hamburger.default).props().open).toBe(true);
});