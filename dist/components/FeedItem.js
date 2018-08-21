"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedItem = function FeedItem(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)("chq-fdi", className) },
    children
  );
};

var FeedItemBody = function FeedItemBody(_ref2) {
  var children = _ref2.children,
      className = _ref2.className;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)("chq-fdi--bd", className) },
    children
  );
};

var FeedItemFooter = function FeedItemFooter(_ref3) {
  var children = _ref3.children,
      className = _ref3.className;
  return _react2.default.createElement(
    "div",
    { className: (0, _classnames2.default)("chq-fdi--ft", className) },
    children
  );
};

Object.assign(FeedItem, {
  Body: FeedItemBody,
  Footer: FeedItemFooter
});

exports.default = FeedItem;