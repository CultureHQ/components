"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hamburger = function Hamburger(_ref) {
  var className = _ref.className,
      open = _ref.open,
      onToggle = _ref.onToggle;
  return _react.default.createElement("button", {
    type: "button",
    className: (0, _classnames.default)("chq-ham", className, {
      "chq-ham-op": open
    }),
    onClick: onToggle
  }, _react.default.createElement("span", null), _react.default.createElement("span", null), _react.default.createElement("span", null));
};

var _default = Hamburger;
exports.default = _default;