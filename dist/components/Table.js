"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function Table(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react.default.createElement("table", {
    className: (0, _classnames.default)("chq-tbl", className)
  }, children);
};

var _default = Table;
exports.default = _default;