"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Grid = function Grid(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)("chq-grid", className)
  }, children);
};

var GridItem = function GridItem(_ref2) {
  var children = _ref2.children,
      className = _ref2.className,
      props = _objectWithoutProperties(_ref2, ["children", "className"]);

  var classList = (0, _classnames.default)("chq-grid--item", className);
  ["xs", "sm", "md", "lg", "xl"].forEach(function (size) {
    if (props[size]) {
      classList = "".concat(classList, " chq-grid--").concat(size, "-").concat(props[size]);
    }
  });
  return _react.default.createElement("div", {
    className: classList
  }, children);
};

Grid.Item = GridItem;
var _default = Grid;
exports.default = _default;