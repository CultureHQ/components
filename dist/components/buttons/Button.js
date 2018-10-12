"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ButtonIcon = function ButtonIcon(_ref) {
  var icon = _ref.icon,
      loading = _ref.loading;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Icon.default, {
    icon: loading ? "load-c" : icon
  }), " ");
};

var Button = function Button(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      _ref2$type = _ref2.type,
      type = _ref2$type === void 0 ? "button" : _ref2$type,
      icon = _ref2.icon,
      inverted = _ref2.inverted,
      primary = _ref2.primary,
      small = _ref2.small,
      loading = _ref2.loading,
      danger = _ref2.danger,
      props = _objectWithoutProperties(_ref2, ["children", "className", "type", "icon", "inverted", "primary", "small", "loading", "danger"]);

  return _react.default.createElement("button", _extends({}, props, {
    type: type,
    className: (0, _classnames.default)("chq-btn", className, {
      "chq-btn-iv": inverted,
      "chq-btn-pr": primary,
      "chq-btn-sm": small,
      "chq-btn-ld": loading,
      "chq-btn-dg": danger
    })
  }), (loading || icon) && _react.default.createElement(ButtonIcon, {
    icon: icon,
    loading: loading
  }), children);
};

var _default = Button;
exports.default = _default;