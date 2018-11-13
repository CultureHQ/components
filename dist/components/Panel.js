"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Loader = _interopRequireDefault(require("./Loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = function Panel(_ref) {
  var className = _ref.className,
      children = _ref.children,
      limitWidth = _ref.limitWidth;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-pan", className, {
      "chq-pan-lim": limitWidth
    })
  }, children);
};

var PanelHeading = function PanelHeading(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      primary = _ref2.primary;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-pan--hd", className, {
      "chq-pan--hd-pr": primary
    })
  }, _react.default.createElement("h2", null, children), _react.default.createElement("hr", null));
};

var PanelBody = function PanelBody(_ref3) {
  var className = _ref3.className,
      children = _ref3.children;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-pan--bd", className)
  }, children);
};

var PanelLoaderBody = function PanelLoaderBody(_ref4) {
  var className = _ref4.className,
      children = _ref4.children,
      loading = _ref4.loading;
  return _react.default.createElement(PanelBody, {
    className: className
  }, _react.default.createElement(_Loader.default, {
    loading: loading
  }, children));
};

var PanelFooter = function PanelFooter(_ref5) {
  var className = _ref5.className,
      children = _ref5.children;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-pan--ft", className)
  }, children);
};

Object.assign(Panel, {
  Heading: PanelHeading,
  Body: PanelBody,
  LoaderBody: PanelLoaderBody,
  Footer: PanelFooter
});
var _default = Panel;
exports.default = _default;