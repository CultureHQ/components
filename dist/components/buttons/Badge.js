"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Badge = function Badge(_ref) {
  var children = _ref.children,
      className = _ref.className,
      icon = _ref.icon,
      _ref$primary = _ref.primary,
      primary = _ref$primary === void 0 ? false : _ref$primary,
      onClick = _ref.onClick;
  var classList = (0, _classnames.default)("chq-bdg", className, {
    "chq-bdg-pr": primary
  });
  return _react.default.createElement("button", {
    type: "button",
    className: classList,
    onClick: onClick
  }, icon && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Icon.default, {
    icon: icon
  }), " "), children);
};

var _default = Badge;
exports.default = _default;