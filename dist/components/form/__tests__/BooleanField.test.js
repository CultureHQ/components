"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _BooleanField = _interopRequireDefault(require("../BooleanField"));

var _Checkmark = _interopRequireDefault(require("../../Checkmark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("calls up to callbacks if they are provided", function () {
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(_BooleanField.default, {
    name: "boolean",
    onChange: function onChange(changeValue) {
      Object.assign(response, {
        changeValue: changeValue
      });
    },
    onFormChange: function onFormChange(formChangeName, formChangeValue) {
      Object.assign(response, {
        formChangeName: formChangeName,
        formChangeValue: formChangeValue
      });
    }
  }));
  component.find("button").simulate("click");
  expect(response).toEqual({
    changeValue: true,
    formChangeName: "boolean",
    formChangeValue: true
  });
});
test("works with initial values", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_BooleanField.default, {
    name: "boolean",
    value: true
  }));
  expect(component.find(_Checkmark.default).props().checked).toBe(true);
  component.find("button").simulate("click");
});