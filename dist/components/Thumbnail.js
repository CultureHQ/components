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

var Thumbnail = function Thumbnail(_ref) {
  var className = _ref.className,
      image = _ref.image,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? "small" : _ref$size,
      _ref$square = _ref.square,
      square = _ref$square === undefined ? false : _ref$square,
      props = _objectWithoutProperties(_ref, ["className", "image", "size", "square"]);

  return _react2.default.createElement("div", _extends({
    className: (0, _classnames2.default)(className, "chq-tmb", {
      "chq-tmb-md": size === "medium",
      "chq-tmb-lg": size === "large",
      "chq-tmb-sq": square
    }),
    style: { backgroundImage: "url(" + image + ")" }
  }, props));
};

exports.default = Thumbnail;