"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require("./Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ButtonIcon = function ButtonIcon(_ref) {
  var icon = _ref.icon,
      loading = _ref.loading;
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(_Icon2.default, { icon: loading ? "load-c" : icon }),
    " "
  );
};

var Button = function Button(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      _ref2$type = _ref2.type,
      type = _ref2$type === undefined ? "button" : _ref2$type,
      icon = _ref2.icon,
      inverted = _ref2.inverted,
      primary = _ref2.primary,
      small = _ref2.small,
      loading = _ref2.loading,
      props = _objectWithoutProperties(_ref2, ["children", "className", "type", "icon", "inverted", "primary", "small", "loading"]);

  return _react2.default.createElement(
    "button",
    _extends({ // eslint-disable-line react/button-has-type
      type: type,
      className: (0, _classnames2.default)("chq-btn", className, {
        "chq-btn-iv": inverted,
        "chq-btn-pr": primary,
        "chq-btn-sm": small,
        "chq-btn-ld": loading
      })
    }, props),
    (loading || icon) && _react2.default.createElement(ButtonIcon, { icon: icon, loading: loading }),
    children
  );
};

exports.default = Button;