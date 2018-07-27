"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Thumbnail = function Thumbnail(_ref) {
  var className = _ref.className,
      image = _ref.image,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? "small" : _ref$size,
      _ref$square = _ref.square,
      square = _ref$square === undefined ? false : _ref$square,
      title = _ref.title;
  return _react2.default.createElement("div", {
    className: (0, _classnames2.default)(className, "chq-tmb", {
      "chq-tmb-md": size === "medium",
      "chq-tmb-lg": size === "large",
      "chq-tmb-sq": square
    }),
    style: { backgroundImage: "url(" + image + ")" },
    title: title
  });
};

exports.default = Thumbnail;