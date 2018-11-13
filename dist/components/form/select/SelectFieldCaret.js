"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../../../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectFieldCaret = function SelectFieldCaret(_ref) {
  var open = _ref.open;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-ffd--sl--caret", {
      "chq-ffd--sl--caret-flip": open
    })
  });
};

var _default = SelectFieldCaret;
exports.default = _default;