"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Calendar = _interopRequireDefault(require("../Calendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("functions properly when no value is passed in", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, null));
  expect(component.find("CalendarDay").length).toBeGreaterThan(0);
});
test("displays expected days with padding at beginning and end", function () {
  var value = new Date(2018, 0, 1, 0, 0, 0);
  var component = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
    value: value
  }));
  expect(component.find("CalendarDay")).toHaveLength(35);
});
test("allows toggling left to go to previous months", function () {
  var value = new Date(2018, 0, 1, 0, 0, 0);
  var component = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
    value: value
  }));
  component.find("button.chq-cal--head--prev").simulate("click");
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("December 2017");
});
test("allows toggling right to go to next months", function () {
  var value = new Date(2018, 0, 1, 0, 0, 0);
  var component = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
    value: value
  }));
  component.find("button.chq-cal--head--next").simulate("click");
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("February 2018");
});
test("updates the visible month when a value is selected", function () {
  var value = new Date(2018, 0, 1, 0, 0, 0);
  var component = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
    value: value
  }));
  component.setProps({
    value: new Date(2019, 0, 1, 0, 0, 0)
  });
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("January 2019");
});
test("does not attempt to update state if month did not change", function () {
  var received = null;

  var onChange = function onChange(value) {
    received = value;
  };

  var value = new Date(2018, 0, 1, 0, 0, 0);
  var component = (0, _enzyme.mount)(_react.default.createElement(_Calendar.default, {
    value: value,
    onChange: onChange
  }));
  component.find("CalendarDay").at(15).simulate("click");
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("January 2018");
  expect(received.getMonth()).toEqual(0);
});