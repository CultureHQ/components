"use strict";

var _react = _interopRequireWildcard(require("react"));

var _enzyme = require("enzyme");

var _Subnav = _interopRequireDefault(require("../Subnav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SubnavContainer = function SubnavContainer(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      activeIndex = _useState2[0],
      setActiveIndex = _useState2[1];

  return _react.default.createElement(_Subnav.default, {
    activeIndex: activeIndex,
    onChange: setActiveIndex
  }, children);
};

test("renders without crashing",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var clicks, onChange, component, mounted, pattern;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          clicks = [];

          onChange = function onChange(index) {
            return clicks.push(index);
          };

          component = _react.default.createElement(_Subnav.default, {
            onChange: onChange
          }, _react.default.createElement(_Subnav.default.Item, null, "One"), _react.default.createElement(_Subnav.default.Item, null, "Two"), _react.default.createElement(_Subnav.default.Item, null, "Three"));
          mounted = (0, _enzyme.mount)(component);
          pattern = [2, 0, 1];
          pattern.forEach(function (index) {
            mounted.find(_Subnav.default.Item).at(index).simulate("click");
          });
          expect(clicks).toEqual(pattern);
          _context.next = 9;
          return expect(component).toHaveNoViolations();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("additionally functions as a controlled component", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(SubnavContainer, null, _react.default.createElement(_Subnav.default.Item, null, "One"), _react.default.createElement(_Subnav.default.Item, null, "Two"), _react.default.createElement(_Subnav.default.Item, null, "Three")));
  component.find(_Subnav.default.Item).at(1).simulate("click");
  expect(component.find(_Subnav.default).props().activeIndex).toEqual(1);
  expect(component.find(_Subnav.default.Item).at(1).props().active).toBe(true);
});