"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Circles = function Circles(_ref) {
  var className = _ref.className;
  return _react2.default.createElement(
    "svg",
    { className: (0, _classnames2.default)("chq-cir", className), viewBox: "0 0 300 300" },
    _react2.default.createElement("circle", {
      className: "chq-cir--sm",
      r: "16",
      cx: "124",
      cy: "42",
      fill: "#fbce49",
      fillOpacity: "0.85"
    }),
    _react2.default.createElement("circle", {
      className: "chq-cir--bl",
      r: "72",
      cx: "98",
      cy: "134",
      fill: "#76a6d6",
      fillOpacity: "0.85"
    }),
    _react2.default.createElement("circle", {
      className: "chq-cir--yl",
      r: "72",
      cx: "202",
      cy: "96",
      fill: "#fbce49",
      fillOpacity: "0.85"
    }),
    _react2.default.createElement("circle", {
      className: "chq-cir--gr",
      r: "72",
      cx: "186",
      cy: "200",
      fill: "#77ae7b",
      fillOpacity: "0.85"
    })
  );
};

exports.default = Circles;