"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Thumbnail = function Thumbnail(_ref) {
  var className = _ref.className,
      image = _ref.image,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "small" : _ref$size,
      _ref$square = _ref.square,
      square = _ref$square === void 0 ? false : _ref$square,
      title = _ref.title;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-tmb", className, {
      "chq-tmb-md": size === "medium",
      "chq-tmb-lg": size === "large",
      "chq-tmb-sq": square
    }),
    style: {
      backgroundImage: "url(".concat(image, ")")
    },
    title: title
  });
};

var _default = Thumbnail;
exports.default = _default;