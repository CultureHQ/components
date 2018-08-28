"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function Tag(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "blue" : _ref$color;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-tag", className, {
      "chq-tag-gy": color === "gray",
      "chq-tag-rd": color === "red"
    })
  }, children);
};

var _default = Tag;
exports.default = _default;