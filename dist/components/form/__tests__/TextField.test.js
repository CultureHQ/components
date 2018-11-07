"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _TextField = _interopRequireDefault(require("../TextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("passes on className", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_TextField.default, {
    name: "text",
    className: "text-field"
  }));
  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("text-field")).toBe(true);
});
test("calls up to callbacks if they are provided", function () {
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(_TextField.default, {
    name: "text",
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
  component.find("textarea").simulate("change", {
    target: {
      value: "Kevin"
    }
  });
  expect(response).toEqual({
    changeValue: "Kevin",
    formChangeName: "text",
    formChangeValue: "Kevin"
  });
});
test("tracks touch status in component state", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_TextField.default, {
    name: "text",
    required: true
  }));
  expect(component.text()).toEqual("");
  component.find("textarea").simulate("change", {
    target: {
      value: ""
    }
  });
  component.find("textarea").simulate("blur");
  expect(component.text()).toEqual("Required");
});
test("displays errors if submitted", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_TextField.default, {
    name: "text",
    required: true
  }));
  expect(component.text()).toEqual("");
  component.setProps({
    submitted: true
  });
  expect(component.text()).toEqual("Required");
});