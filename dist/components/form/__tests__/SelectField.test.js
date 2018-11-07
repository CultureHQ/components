"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SelectField = _interopRequireDefault(require("../SelectField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTIONS = [{
  label: "Harry",
  value: "Harry"
}, {
  label: "Hermione",
  value: "Hermione"
}, {
  label: "Ron",
  value: "Ron"
}];
test("passes on className", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_SelectField.default, {
    name: "name",
    className: "select-field"
  }));
  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("select-field")).toBe(true);
});
test("calls up to callbacks if they are provided", function () {
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(_SelectField.default, {
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
    },
    options: OPTIONS
  }));
  component.find("select").simulate("change", {
    target: {
      value: "Harry"
    }
  });
  expect(response).toEqual({
    changeValue: "Harry",
    formChangeName: "name",
    formChangeValue: "Harry"
  });
});
test("does not call callbacks when they are not provided", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_SelectField.default, {
    name: "name",
    options: OPTIONS
  }));
  component.find("select").simulate("change", {
    target: {
      value: "Harry"
    }
  });
});