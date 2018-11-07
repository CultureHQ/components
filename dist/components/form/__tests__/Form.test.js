"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Form = _interopRequireDefault(require("../Form"));

var _BooleanField = _interopRequireDefault(require("../BooleanField"));

var _CentsField = _interopRequireDefault(require("../CentsField"));

var _FormFields = require("../FormFields");

var _TextField = _interopRequireDefault(require("../TextField"));

var _SubmitButton = _interopRequireDefault(require("../SubmitButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mountFullForm = function mountFullForm() {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Form.default, {
    onSubmit: function onSubmit(submitted) {
      component.submitted = submitted;
    },
    initialValues: {
      email: "kevin@culturehq.com"
    }
  }, _react.default.createElement(_BooleanField.default, {
    name: "boolean"
  }, "Boolean"), _react.default.createElement(_FormFields.StringField, {
    name: "name"
  }, "Name"), _react.default.createElement(_FormFields.EmailField, {
    name: "email"
  }, "Email"), _react.default.createElement(_TextField.default, {
    name: "text"
  }, "Text"), _react.default.createElement("p", null, "This is a great form!"), false && _react.default.createElement("p", null, "This is not going to be displayed"), _react.default.createElement(_SubmitButton.default, null)));
  component.find("#name").simulate("change", {
    target: {
      value: "Kevin"
    }
  });
  return component;
};

test("passes on className", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Form.default, {
    className: "form"
  }));
  expect(component.hasClass("form")).toBe(true);
});
test("gathers values as they change and submits them", function () {
  var component = mountFullForm();
  component.simulate("submit");
  expect(component.submitted).toEqual({
    boolean: false,
    name: "Kevin",
    email: "kevin@culturehq.com"
  });
  component.unmount();
});
test("allows calling submit manually", function () {
  var component = mountFullForm();
  component.instance().submit();
  expect(component.submitted.name).toEqual("Kevin");
});
test("does not attempt to setState once the component is unmounted", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Form.default, {
    onSubmit: function onSubmit() {
      return new Promise(function (resolve) {
        component.unmount();
        resolve();
      });
    }
  }, _react.default.createElement(_BooleanField.default, {
    name: "boolean"
  }, "Boolean")));
  component.instance().submit();
});
test("passes down initialValues", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Form.default, {
    initialValues: {
      cents: 523,
      name: "Kevin"
    }
  }, _react.default.createElement(_CentsField.default, {
    name: "cents"
  }, "Cents"), _react.default.createElement(_FormFields.StringField, {
    name: "name"
  }, "Name")));
  expect(component.find("#cents").props().value).toEqual(5.23);
  expect(component.find("#name").props().value).toEqual("Kevin");
});
test("disallows submitting if validation fails", function () {
  var submitted = null;

  var onSubmit = function onSubmit(values) {
    submitted = values;
    return Promise.resolve();
  };

  var validator = function validator(value) {
    return value === "Pass" ? null : "Fail";
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_Form.default, {
    onSubmit: onSubmit
  }, _react.default.createElement(_FormFields.StringField, {
    name: "value",
    validator: validator
  }, "Value")));
  component.simulate("submit");
  expect(submitted).toBe(null);
  component.find("#value").simulate("change", {
    target: {
      value: "Pass"
    }
  });
  component.simulate("submit");
  expect(submitted).toEqual({
    value: "Pass"
  });
});