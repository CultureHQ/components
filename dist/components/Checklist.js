"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Checkmark = _interopRequireDefault(require("./Checkmark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checklist = function Checklist(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-chl", className)
  }, children);
};

Object.assign(Checklist, {
  Item: _Checkmark.default
});
var _default = Checklist;
exports.default = _default;