"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.COLORS = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var COLORS = {
  darkblue: "db",
  green: "gr",
  lightblue: "lb",
  yellow: "yw"
};
exports.COLORS = COLORS;

var CheerSVG = function CheerSVG(_ref) {
  var className = _ref.className,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? "darkblue" : _ref$color,
      pop = _ref.pop,
      small = _ref.small;
  return _react.default.createElement("svg", {
    className: (0, _classnames.default)("chq-chr", className, "chq-chr-".concat(COLORS[color]), {
      "chq-chr-pp": pop,
      "chq-chr-sm": small
    }),
    viewBox: "0 0 344 512"
  }, _react.default.createElement("path", {
    d: "m331 25c-11-9-27-8-36 3l-88 104c-4 4-9 7-16 7l-40 0c-5 0-12-3-16-7l-88-104c-9-11-25-12-36-3-11 9-12 25-3 36l100 120 0 143 0 8 0 152c0 15 12 25 25 25 15 0 25-12 25-25l0-152 20 0 0 152c0 15 12 25 25 25 15 0 25-12 25-25l0-152 0-8 0-143 100-120c9-11 8-26 2-37z"
  }), _react.default.createElement("circle", {
    r: "55",
    cy: "60",
    cx: "171"
  }), _react.default.createElement("circle", {
    className: "chq-chr--fb chq-chr--fb-1",
    r: "40",
    cy: "0",
    cx: "-24"
  }), _react.default.createElement("circle", {
    className: "chq-chr--fb chq-chr--fb-7",
    r: "40",
    cy: "0",
    cx: "364"
  }), _react.default.createElement("circle", {
    className: "chq-chr--fb chq-chr--fb-2",
    r: "40",
    cy: "-54",
    cx: "31"
  }), _react.default.createElement("circle", {
    className: "chq-chr--fb chq-chr--fb-6",
    r: "40",
    cy: "-54",
    cx: "309"
  }), _react.default.createElement("circle", {
    className: "chq-chr--fb chq-chr--fb-3",
    r: "40",
    cy: "-86",
    cx: "96"
  }), _react.default.createElement("circle", {
    className: "chq-chr--fb chq-chr--fb-5",
    r: "40",
    cy: "-86",
    cx: "244"
  }), _react.default.createElement("circle", {
    className: "chq-chr--fb chq-chr--fb-4",
    r: "40",
    cy: "-101",
    cx: "170"
  }));
};

var Cheer = function Cheer(_ref2) {
  var name = _ref2.name,
      props = _objectWithoutProperties(_ref2, ["name"]);

  if (name) {
    return _react.default.createElement(_Tooltip.default, {
      tip: name
    }, _react.default.createElement(CheerSVG, props));
  }

  return _react.default.createElement(CheerSVG, props);
};

var _default = Cheer;
exports.default = _default;