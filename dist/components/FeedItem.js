"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FeedItem = function FeedItem(_ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["children", "className"]);

  return _react2.default.createElement(
    "div",
    _extends({ className: (0, _classnames2.default)(className, "chq-fdi") }, props),
    children
  );
};

FeedItem.Body = function (_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      props = _objectWithoutProperties(_ref2, ["children", "className"]);

  return _react2.default.createElement(
    "div",
    _extends({ className: (0, _classnames2.default)(className, "chq-fdi--bd") }, props),
    children
  );
};

FeedItem.Footer = function (_ref3) {
  var children = _ref3.children,
      className = _ref3.className,
      props = _objectWithoutProperties(_ref3, ["children", "className"]);

  return _react2.default.createElement(
    "div",
    _extends({ className: (0, _classnames2.default)(className, "chq-fdi--ft") }, props),
    children
  );
};

exports.default = FeedItem;