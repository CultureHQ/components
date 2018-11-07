"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var FormFields = _interopRequireWildcard(require("../FormFields"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CASES = Object.keys(FormFields).map(function (fieldName) {
  return [FormFields[fieldName]];
});
test.each(CASES)("passes on className", function (FormField) {
  var component = (0, _enzyme.mount)(_react.default.createElement(FormField, {
    name: "name",
    className: "form-field"
  }));
  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("form-field")).toBe(true);
});
test.each(CASES)("calls up to callbacks if they are provided", function (FormField) {
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(FormField, {
    name: "name",
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
  component.find("input").simulate("change", {
    target: {
      value: "Kevin"
    }
  });
  expect(response).toEqual({
    changeValue: "Kevin",
    formChangeName: "name",
    formChangeValue: "Kevin"
  });
});
test.each(CASES)("tracks touch status in component state", function (FormField) {
  var component = (0, _enzyme.mount)(_react.default.createElement(FormField, {
    name: "name",
    required: true
  }));
  expect(component.text()).toEqual("");
  component.find("input").simulate("blur");
  expect(component.text()).toEqual("Required");
});
test.each(CASES)("displays errors if submitted", function (FormField) {
  var component = (0, _enzyme.mount)(_react.default.createElement(FormField, {
    name: "name",
    required: true
  }));
  expect(component.text()).toEqual("");
  component.setProps({
    submitted: true
  });
  expect(component.text()).toEqual("Required");
});