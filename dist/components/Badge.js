"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Badge = function Badge(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$primary = _ref.primary,
      primary = _ref$primary === undefined ? false : _ref$primary,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    "button",
    {
      type: "button",
      className: (0, _classnames2.default)(className, "chq-bdg", { "chq-bdg-pr": primary }),
      onClick: onClick
    },
    children
  );
};

exports.default = Badge;