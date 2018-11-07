"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Button = _interopRequireDefault(require("../../buttons/Button"));

var _Confirm = _interopRequireWildcard(require("../Confirm"));

var _ModalDialog = _interopRequireDefault(require("../ModalDialog"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("opens a modal when the onTrigger function is called", function () {
  var message = "This is the body of the confirmation";
  var component = (0, _enzyme.mount)(_react.default.createElement(_Confirm.default, {
    trigger: function trigger(onTrigger) {
      return _react.default.createElement(_Button.default, {
        onClick: onTrigger
      }, "Open");
    }
  }, message));
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
  component.find(_Button.default).simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(1);
  expect(component.find(_ModalDialog.default.Body).text()).toContain(message);
});
test("calls the onOpen callback if it is provided", function () {
  var opened = false;
  var component = (0, _enzyme.mount)(_react.default.createElement(_Confirm.default, {
    trigger: function trigger(onTrigger) {
      return _react.default.createElement(_Button.default, {
        onClick: onTrigger
      }, "Open");
    },
    onOpen: function onOpen() {
      opened = true;
    }
  }));
  expect(opened).toBe(false);
  component.find(_Button.default).simulate("click");
  expect(opened).toBe(true);
});
test("closes the modal the cancel button is clicked", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Confirm.default, {
    startOpen: true,
    trigger: function trigger() {}
  }, "Are you sure?"));
  component.find(".chq-btn-iv").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
});
test("calls the onAccept callback and closes when the confirmation is accepted", function () {
  var accepted = false;

  var onAccept = function onAccept() {
    accepted = true;
  };

  var component = (0, _enzyme.mount)(_react.default.createElement(_Confirm.default, {
    danger: true,
    onAccept: onAccept,
    startOpen: true,
    trigger: function trigger() {}
  }, "Are you sure?"));
  component.find(".chq-btn-dg").simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
  expect(accepted).toBe(true);
});
test("ConfirmDelete sets default values", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Confirm.ConfirmDelete, {
    startOpen: true,
    trigger: function trigger() {}
  }));
  expect(component.find(".chq-btn-dg").text()).toEqual("Delete");
});
test("passes on contentRef", function () {
  var contentRef = function contentRef(element) {
    contentRef.current = element;
  };

  (0, _enzyme.mount)(_react.default.createElement(_Confirm.default, {
    startOpen: true,
    contentRef: contentRef,
    trigger: function trigger() {}
  }));
  expect(contentRef.current).not.toBe(undefined);
});