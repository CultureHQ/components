"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Circles = _interopRequireDefault(require("./Circles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = function Spinner(_ref) {
  var className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-spn", className)
  }, _react.default.createElement(_Circles.default, null));
};

var _default = Spinner;
exports.default = _default;