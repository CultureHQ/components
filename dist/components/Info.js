"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Info = function Info(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)(className, "chq-inf") },
    _react2.default.createElement(
      "p",
      null,
      children
    )
  );
};

exports.default = Info;