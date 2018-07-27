"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkmark = function Checkmark(_ref) {
  var className = _ref.className,
      checked = _ref.checked,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    "button",
    {
      type: "button",
      className: (0, _classnames2.default)(className, "chq-cmk", {
        "chq-cmk-ck": checked,
        "chq-cmk-cl": onClick
      }),
      onClick: onClick
    },
    _react2.default.createElement(
      "svg",
      { viewBox: "0 0 52 52" },
      _react2.default.createElement("circle", { cx: "26", cy: "26", r: "25", fill: "none" }),
      _react2.default.createElement("path", { fill: "none", d: "M14.1 27.2l7.1 7.2 16.7-16.8" })
    )
  );
};

exports.default = Checkmark;