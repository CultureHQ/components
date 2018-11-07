"use strict";

var _react = _interopRequireWildcard(require("react"));

var _enzyme = require("enzyme");

var _Cheer = _interopRequireDefault(require("../../Cheer"));

var _CheerButton = _interopRequireDefault(require("../CheerButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Container = function Container(_ref) {
  var initialCheered = _ref.cheered,
      small = _ref.small;

  var _useState = (0, _react.useState)(initialCheered || false),
      _useState2 = _slicedToArray(_useState, 2),
      cheered = _useState2[0],
      setCheered = _useState2[1];

  var onCheerToggle = function onCheerToggle(nextCheered) {
    setCheered(nextCheered);
    return Promise.resolve();
  };

  return _react.default.createElement(_CheerButton.default, {
    cheered: cheered,
    small: small,
    onCheerToggle: onCheerToggle
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
          return expect(_react.default.createElement(_CheerButton.default, {
            cheered: true
          })).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("renders a button and calls back", function () {
  var received = null;

  var onCheerToggle = function onCheerToggle(state) {
    received = state;
    return Promise.resolve();
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_CheerButton.default, {
    onCheerToggle: onCheerToggle
  }));
  component.simulate("click");
  expect(received).toBe(true);
});
test("renders a Cheer if it has been cheered", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_CheerButton.default, {
    cheered: true
  }));
  expect(component.find(_Cheer.default)).toHaveLength(2);
});
test("pops in the Cheer if it was not initially cheered", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(Container, null));
  component.simulate("click");
  component.update();
  expect(component.find(_Cheer.default)).toHaveLength(2);
  expect(component.find(_Cheer.default).last().find("svg").hasClass("chq-chr-pp")).toBe(true);
});
test("does not pop in the Cheer if it was initially cheered", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(Container, {
    cheered: true
  }));
  expect(component.find(_Cheer.default)).toHaveLength(2);
  expect(component.find(_Cheer.default).last().find("svg").hasClass("chq-chr-pp")).toBe(false);
});
test("does not display text when small", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(Container, {
    small: true
  }));
  expect(component.text()).toEqual("");
});