"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Pagination = _interopRequireDefault(require("../Pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var mounted = function mounted(currentPage, totalPages) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return (0, _enzyme.mount)(_react.default.createElement(_Pagination.default, _extends({
    currentPage: currentPage,
    totalPages: totalPages
  }, props)));
};

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
          component = _react.default.createElement(_Pagination.default, {
            currentPage: 1,
            totalPages: 10
          });
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
  var component = mounted(1, 10);
  expect(component.find(".chq-pag").type()).toEqual("nav");
});
test("passes on className", function () {
  var component = mounted(1, 10, {
    className: "pagination"
  });
  expect(component.find("nav").hasClass("pagination")).toBe(true);
  expect(component.find("nav").hasClass("chq-pag")).toBe(true);
});
test("displays nothing if there are fewer than two pages", function () {
  var component = mounted(1, 1);
  expect(component.html()).toBe(null);
});
test("deactivates the prev and next buttons correctly on the first page", function () {
  var component = mounted(1, 10);
  var buttons = component.find("button");
  expect(buttons.at(0).props().disabled).toBe(true);
  expect(buttons.at(buttons.length - 1).props().disabled).toBe(false);
});
test("deactivates the prev and next buttons correctly on the last page", function () {
  var component = mounted(10, 10);
  var buttons = component.find("button");
  expect(buttons.at(0).props().disabled).toBe(false);
  expect(buttons.at(buttons.length - 1).props().disabled).toBe(true);
});
test("adds the first and last pages if they're not in the inner window", function () {
  var component = mounted(10, 20);
  var buttons = component.find("button");
  expect(buttons.at(1).text()).toEqual("1");
  expect(buttons.at(buttons.length - 2).text()).toEqual("20");
});
test("adds the number if within 5 of the start or end", function () {
  var component = mounted(5, 9);
  var labels = component.find("button").slice(1, -1).map(function (node) {
    return node.text();
  });
  labels.forEach(function (label, index) {
    expect(label).toEqual((index + 1).toString());
  });
});
test("adds spacers if the far enough away from the ends", function () {
  var component = mounted(10, 20);
  expect(component.find(".chq-pag--sp")).toHaveLength(2);
});
test("calls the onClick handler with the correct page number", function () {
  var clicked = [];

  var onClick = function onClick(page) {
    return clicked.push(page);
  };

  var component = mounted(10, 20, {
    onClick: onClick
  });
  var buttons = component.find("button");
  [0, 1, 3, 4, 5, 7, 8].forEach(function (index) {
    buttons.at(index).simulate("click");
  });
  expect(clicked).toEqual([9, 1, 9, 11, 20, 11]);
});