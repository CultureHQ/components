"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Button = _interopRequireDefault(require("../../buttons/Button"));

var _PlainButton = _interopRequireDefault(require("../../buttons/PlainButton"));

var _Modal = _interopRequireDefault(require("../Modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("opens a modal when the onTrigger function is called", function () {
  var message = "This is the body of the modal";
  var component = (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
    trigger: function trigger(onTrigger) {
      return _react.default.createElement(_Button.default, {
        onClick: onTrigger
      }, "Open");
    }
  }, _react.default.createElement(_Modal.default.Heading, null, "Heading"), _react.default.createElement(_Modal.default.Body, null, message), _react.default.createElement(_Modal.default.Footer, null, "Footer")));
  expect(component.find(".chq-pan--bd")).toHaveLength(0);
  component.find(_Button.default).simulate("click");
  expect(component.find(".chq-pan--bd")).toHaveLength(1);
  expect(component.find(_Modal.default.Body).text()).toContain(message);
});
test("closes the modal the heading button is clicked", function () {
  var component = (0, _enzyme.mount)(_react.default.createElement(_Modal.default, {
    startOpen: true,
    trigger: function trigger(onTrigger) {
      return _react.default.createElement(_Button.default, {
        onClick: onTrigger
      }, "Open");
    }
  }, _react.default.createElement(_Modal.default.Heading, null, "Heading")));
  component.find(_PlainButton.default).simulate("click");
  expect(component.find(".chq-pan--hd")).toHaveLength(0);
});