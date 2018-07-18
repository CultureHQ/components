"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hamburger = function Hamburger(_ref) {
  var className = _ref.className,
      open = _ref.open,
      onToggle = _ref.onToggle;
  return _react2.default.createElement(
    "button",
    {
      type: "button",
      className: (0, _classnames2.default)(className, "chq-ham", { "chq-ham-op": open }),
      onClick: onToggle
    },
    _react2.default.createElement("span", null),
    _react2.default.createElement("span", null),
    _react2.default.createElement("span", null)
  );
};

exports.default = Hamburger;