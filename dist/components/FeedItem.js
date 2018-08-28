"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedItem = function FeedItem(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-fdi", className)
  }, children);
};

var FeedItemBody = function FeedItemBody(_ref2) {
  var children = _ref2.children,
      className = _ref2.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-fdi--bd", className)
  }, children);
};

var FeedItemFooter = function FeedItemFooter(_ref3) {
  var children = _ref3.children,
      className = _ref3.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-fdi--ft", className)
  }, children);
};

Object.assign(FeedItem, {
  Body: FeedItemBody,
  Footer: FeedItemFooter
});
var _default = FeedItem;
exports.default = _default;