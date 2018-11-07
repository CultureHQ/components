"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _MultiImageField = _interopRequireWildcard(require("../MultiImageField"));

var _image = _interopRequireDefault(require("../../__tests__/__mocks__/image"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
          return expect(_react.default.createElement(_MultiImageField.default, {
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
  var files = [{
    name: "Some file"
  }, {
    name: "Some other file"
  }];
  var response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };
  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "images",
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
      files: files
    }
  });
  expect(response).toEqual({
    changeValue: files,
    formChangeName: "images",
    formChangeValue: files
  });
  component.unmount();
});
test("does not call callbacks when they are not provided", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "image"
  }));
  component.find("input").simulate("change", {
    target: {
      files: ["Some file"]
    }
  });
  component.unmount();
});
test("responds to the open edit callback", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "images"
  }));
  component.setState({
    currentTransport: new _MultiImageField.Transport(_image.default),
    transports: [new _MultiImageField.Transport(_image.default)]
  });

  var findEdit = function findEdit(node) {
    return node.text() && node.text().trim() === "Edit";
  };

  component.find("button").findWhere(findEdit).simulate("click");
  expect(component.find("ModalDialog")).toHaveLength(1);
});
test("responds to edit callback", function () {
  var response = null;

  var onChange = function onChange(value) {
    response = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "images",
    onChange: onChange
  }));
  component.setState({
    currentTransport: new _MultiImageField.Transport(_image.default),
    transports: [new _MultiImageField.Transport(_image.default), new _MultiImageField.Transport({
      name: "foobar"
    })]
  });
  component.instance().handleImageEdited(_image.default);
  expect(response).toEqual([_image.default, {
    name: "foobar"
  }]);
  component.unmount();
});
test("responds to failure callback", function () {
  var response = null;

  var onChange = function onChange(value) {
    response = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "images",
    onChange: onChange
  }));
  component.setState({
    currentTransport: new _MultiImageField.Transport(_image.default),
    transports: [new _MultiImageField.Transport(_image.default)]
  });
  component.instance().handleImageFailure();
  expect(response).toEqual([]);
  component.unmount();
});
test("responds to the remove callback", function () {
  var response = null;

  var onChange = function onChange(value) {
    response = value;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "images",
    onChange: onChange
  }));
  component.setState({
    currentTransport: new _MultiImageField.Transport(_image.default),
    transports: [new _MultiImageField.Transport(_image.default)]
  });

  var findEdit = function findEdit(node) {
    return node.text() && node.text().trim() === "Remove";
  };

  component.find("button").findWhere(findEdit).simulate("click");
  expect(response).toEqual([]);
  component.unmount();
});
test("handles closing the modal", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "images"
  }));
  component.setState({
    editorOpen: true
  });
  component.instance().handleClose();
  expect(component.state().editorOpen).toBe(false);
});
test("handles clicking the file field", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_MultiImageField.default, {
    name: "images"
  }));
  component.instance().handleClick();
  expect(component.find("input").instance().value).toBe("");
});