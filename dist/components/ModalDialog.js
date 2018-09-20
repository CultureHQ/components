"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _PlainButton = _interopRequireDefault(require("./PlainButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var entrances = {
  slideIn: "chq-mdl-si",
  zoomIn: "chq-mdl-zi"
};

var ModalDialogHeading = function ModalDialogHeading(_ref) {
  var children = _ref.children,
      className = _ref.className,
      onClose = _ref.onClose;
  return _react.default.createElement(_Panel.default.Heading, {
    primary: true,
    className: className
  }, children, _react.default.createElement(_PlainButton.default, {
    className: "chq-mdl--cl",
    onClick: onClose
  }, _react.default.createElement(_Icon.default, {
    icon: "ios-close-empty"
  })));
};

var ModalDialog = function ModalDialog(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      contentRef = _ref2.contentRef,
      _ref2$entrance = _ref2.entrance,
      entrance = _ref2$entrance === void 0 ? "slideIn" : _ref2$entrance,
      onClose = _ref2.onClose;
  return _react.default.createElement(_reactModal.default, {
    className: (0, _classnames.default)("chq-mdl", className, entrances[entrance]),
    contentRef: contentRef,
    onRequestClose: onClose,
    isOpen: true,
    style: {
      overlay: {
        backgroundColor: "rgba(0, 0, 0, .3)",
        zIndex: 2147483647
      }
    }
  }, children);
};

Object.assign(ModalDialog, {
  setAppElement: _reactModal.default.setAppElement,
  Heading: ModalDialogHeading,
  Body: _Panel.default.Body,
  LoaderBody: _Panel.default.LoaderBody,
  Footer: _Panel.default.Footer
});
var _default = ModalDialog;
exports.default = _default;