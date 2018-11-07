"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _reactModal = _interopRequireDefault(require("react-modal"));

var _ModalDialog = _interopRequireDefault(require("../ModalDialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("passes on class name", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_ModalDialog.default, {
    className: "modal-dialog"
  }));
  expect(component.find(_reactModal.default).hasClass("modal-dialog")).toBe(true);
  expect(component.find(_reactModal.default).hasClass("chq-mdl")).toBe(true);
});
test("passes on contentRef", function () {
  var contentRef = function contentRef(element) {
    contentRef.current = element;
  };

  (0, _enzyme.mount)(_react.default.createElement(_ModalDialog.default, {
    contentRef: contentRef
  }));
  expect(contentRef.current).not.toBe(undefined);
});