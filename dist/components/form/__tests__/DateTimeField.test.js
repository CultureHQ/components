"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _DateTimeField = _interopRequireDefault(require("../DateTimeField"));

var _Form = _interopRequireDefault(require("../Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("functions as expected", function () {
  var received = null;

  var onSubmit = function onSubmit(values) {
    received = values;
    return Promise.resolve();
  };

  var initialValues = {
    datetime: new Date(2018, 0, 1, 0, 0, 0).toISOString()
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(_Form.default, {
    onSubmit: onSubmit,
    initialValues: initialValues
  }, _react.default.createElement(_DateTimeField.default, {
    name: "datetime"
  })));
  component.find("button.chq-ffd--dt").simulate("click");
  component.find("button.chq-cal--day").at(15).simulate("click");
  component.find("button.chq-tsl--op").at(52).simulate("click");
  component.instance().submit();
  expect(received.datetime).toEqual("2018-01-15T13:00:00.000Z");
});
test("works without a value passed in", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_DateTimeField.default, null));
  expect(component.find("button")).toHaveLength(1);
});
test("allows clicking on select before making a time selection", function () {
  var received = null;

  var onChange = function onChange(value) {
    received = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_DateTimeField.default, {
    onChange: onChange
  }));
  component.find("button.chq-ffd--dt").simulate("click");
  component.find("button.chq-cal--day").at(15).simulate("click");
  component.find("Button").simulate("click");
  expect(received.endsWith("T12:00:00.000Z")).toBe(true);
});
test("works when clicking on a time before a date", function () {
  var received = null;

  var onChange = function onChange(value) {
    received = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_DateTimeField.default, {
    onChange: onChange
  }));
  component.find("button.chq-ffd--dt").simulate("click");
  component.find("button.chq-tsl--op").at(52).simulate("click");
  expect(received.endsWith("T13:00:00.000Z")).toBe(true);
});