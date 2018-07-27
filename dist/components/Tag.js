"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function Tag(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? "blue" : _ref$color;
  return _react2.default.createElement(
    "div",
    {
      className: (0, _classnames2.default)(className, "chq-tag", {
        "chq-tag-gy": color === "gray",
        "chq-tag-rd": color === "red"
      })
    },
    children
  );
};

exports.default = Tag;