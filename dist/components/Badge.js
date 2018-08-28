"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Badge = function Badge(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$primary = _ref.primary,
      primary = _ref$primary === void 0 ? false : _ref$primary,
      onClick = _ref.onClick;
  return _react.default.createElement("button", {
    type: "button",
    className: (0, _classnames.default)("chq-bdg", className, {
      "chq-bdg-pr": primary
    }),
    onClick: onClick
  }, children);
};

var _default = Badge;
exports.default = _default;