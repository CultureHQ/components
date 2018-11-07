"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ImageField = _interopRequireDefault(require("../ImageField"));

var _image = _interopRequireDefault(require("../../__tests__/__mocks__/image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

test("has no violations",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return expect(_react.default.createElement(_ImageField.default, {
            name: "image"
          })).toHaveNoViolations();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("calls up to callbacks if they are provided", function () {
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(_ImageField.default, {
    name: "image",
    onChange: function onChange(changeValue) {
      return Object.assign(response, {
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
      files: ["Some file"]
    }
  });
  expect(response).toEqual({
    changeValue: "Some file",
    formChangeName: "image",
    formChangeValue: "Some file"
  });
  component.unmount();
});
test("does not call callbacks when they are not provided", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_ImageField.default, {
    name: "image"
  }));
  component.find("input").simulate("change", {
    target: {
      files: ["Some file"]
    }
  });
  component.unmount();
});
test("responds to edit callback", function () {
  var response = null;

  var onChange = function onChange(value) {
    response = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_ImageField.default, {
    name: "image",
    onChange: onChange
  }));
  component.instance().handleImageEdited(_image.default);
  expect(response).toEqual(_image.default);
  component.unmount();
});
test("responds to failures", function () {
  var response = "foo";

  var onChange = function onChange(value) {
    response = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_ImageField.default, {
    name: "image",
    onChange: onChange
  }));
  component.find("input").simulate("change", {
    target: {
      files: ["foo"]
    }
  });
  component.find("img").props().onError();
  expect(response).toBe(null);
});
test("handles closing the modal", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_ImageField.default, {
    name: "image"
  }));
  component.setState({
    editorOpen: true
  });
  component.instance().handleClose();
  expect(component.state().editorOpen).toBe(false);
});
test("handles deselecting files", function () {
  var response = "foo";

  var onChange = function onChange(value) {
    response = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_ImageField.default, {
    name: "image",
    onChange: onChange
  }));
  component.find("input").simulate("change", {
    target: {
      files: []
    }
  });
  expect(response).toBe(null);
});
test("displays a progress bar if progress is reported", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_ImageField.default, {
    name: "image",
    progress: 5
  }));
  expect(component.find(".chq-ffd--im--prog")).toHaveLength(1);
});