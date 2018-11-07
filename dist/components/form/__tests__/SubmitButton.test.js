"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SubmitButton = _interopRequireDefault(require("../SubmitButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("renders without crashing", function () {
  var message = function message(submitting) {
    return submitting ? "Loading..." : "Load";
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_SubmitButton.default, null, message));
  expect(component.text()).toEqual("Load");
  component.setProps({
    submitting: true
  });
  component.update();
  expect(component.text()).toEqual("Loading...");
});
test("uses the default text if children is not provided", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_SubmitButton.default, null));
  expect(component.text()).toEqual("Submit");
  component.setProps({
    submitting: true
  });
  component.update();
  expect(component.text()).toEqual("Submitting...");
});