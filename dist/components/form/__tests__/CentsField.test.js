"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _CentsField = _interopRequireDefault(require("../CentsField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("calls up to callbacks if they are provided", function () {
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(_CentsField.default, {
    name: "cents",
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
      value: 1.23
    }
  });
  expect(response).toEqual({
    changeValue: 123,
    formChangeName: "cents",
    formChangeValue: 123
  });
});
test("displays the value using cents", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_CentsField.default, {
    name: "cents",
    value: 123
  }));
  expect(component.find("input").props().value).toEqual(1.23);
});
test("validates that the value cannot be <= 0", function () {
  var response = null;

  var onError = function onError(error) {
    response = error;
  };

  (0, _enzyme.mount)(_react.default.createElement(_CentsField.default, {
    name: "cents",
    value: -5,
    onError: onError
  }));
  expect(response).not.toBe(null);
});
test("handles cases where the value is empty", function () {
  var response = null;

  var onChange = function onChange(value) {
    response = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_CentsField.default, {
    name: "cents",
    onChange: onChange
  }));
  component.find("input").simulate("change", {
    target: {
      value: ""
    }
  });
  expect(response).toBe(null);
});
test("functions without an onChange", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_CentsField.default, {
    name: "cents"
  }));
  component.find("input").simulate("change", {
    target: {
      value: ""
    }
  });
});