"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Circles = function Circles(_ref) {
  var className = _ref.className;
  return _react.default.createElement("svg", {
    className: (0, _classnames.default)("chq-cir", className),
    viewBox: "0 0 300 300"
  }, _react.default.createElement("circle", {
    className: "chq-cir--sm",
    r: "16",
    cx: "124",
    cy: "42",
    fill: "#fbce49",
    fillOpacity: "0.85"
  }), _react.default.createElement("circle", {
    className: "chq-cir--bl",
    r: "72",
    cx: "98",
    cy: "134",
    fill: "#76a6d6",
    fillOpacity: "0.85"
  }), _react.default.createElement("circle", {
    className: "chq-cir--yl",
    r: "72",
    cx: "202",
    cy: "96",
    fill: "#fbce49",
    fillOpacity: "0.85"
  }), _react.default.createElement("circle", {
    className: "chq-cir--gr",
    r: "72",
    cx: "186",
    cy: "200",
    fill: "#77ae7b",
    fillOpacity: "0.85"
  }));
};

var _default = Circles;
exports.default = _default;