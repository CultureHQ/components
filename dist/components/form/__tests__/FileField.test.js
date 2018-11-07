"use strict";

var _react = _interopRequireWildcard(require("react"));

var _enzyme = require("enzyme");

var _FileField = _interopRequireDefault(require("../FileField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FileFieldContainer = function FileFieldContainer(props) {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  return _react.default.createElement(_FileField.default, _extends({}, props, {
    value: value,
    onChange: setValue
  }));
};

var mountWithUtils = function mountWithUtils(component) {
  var mounted = (0, _enzyme.mount)(component);
  return Object.assign(mounted, {
    selectFiles: function selectFiles(files) {
      return mounted.find("input[type='file']").simulate("change", {
        target: {
          files: files
        }
      });
    },
    getFileSummary: function getFileSummary() {
      return mounted.find(".chq-ffd--fd").text();
    }
  });
};

test("passes on className", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_FileField.default, {
    name: "name",
    className: "file-field"
  }));
  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("file-field")).toBe(true);
});
test("calls up to callbacks if they are provided", function () {
  var file = {
    name: "foo"
  };
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = mountWithUtils(_react.default.createElement(_FileField.default, {
    name: "file",
    value: file,
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
  component.selectFiles([file]);
  expect(response).toEqual({
    changeValue: file,
    formChangeName: "file",
    formChangeValue: file
  });
});
test("tracks touch status in component state", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_FileField.default, {
    name: "name",
    required: true
  }));
  expect(component.text()).not.toContain("Required");
  component.find("input[type='file']").simulate("change", {
    target: {
      files: [{
        foo: "bar"
      }]
    }
  });
  expect(component.text()).toContain("Required");
});
test("works with multiple files", function () {
  var files = [{
    name: "foo"
  }, {
    name: "bar"
  }, {
    name: "baz"
  }];
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = mountWithUtils(_react.default.createElement(_FileField.default, {
    multiple: true,
    value: files,
    name: "files",
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
  component.selectFiles(files);
  expect(response).toEqual({
    changeValue: files,
    formChangeName: "files",
    formChangeValue: files
  });
});
test("displays an accurate summary", function () {
  var files = [{
    name: "foo"
  }, {
    name: "bar"
  }, {
    name: "baz"
  }];
  var component = mountWithUtils(_react.default.createElement(FileFieldContainer, {
    multiple: true,
    name: "files"
  }));
  component.selectFiles(files);
  expect(component.getFileSummary()).toEqual("foo, bar, baz");
  component.selectFiles([]);
  expect(component.getFileSummary()).toEqual("");
});