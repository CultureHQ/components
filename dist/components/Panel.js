"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = function Panel(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)("chq-pan", className) },
    children
  );
};

var PanelHeading = function PanelHeading(_ref2) {
  var className = _ref2.className,
      children = _ref2.children;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)("chq-pan--hd", className) },
    _react2.default.createElement(
      "h2",
      null,
      children
    ),
    _react2.default.createElement("hr", null)
  );
};

var PanelBody = function PanelBody(_ref3) {
  var className = _ref3.className,
      children = _ref3.children;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)("chq-pan--bd", className) },
    children
  );
};

var PanelFooter = function PanelFooter(_ref4) {
  var className = _ref4.className,
      children = _ref4.children;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)("chq-pan--ft", className) },
    children
  );
};

Object.assign(Panel, {
  Heading: PanelHeading,
  Body: PanelBody,
  Footer: PanelFooter
});

exports.default = Panel;