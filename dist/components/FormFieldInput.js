"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormFieldInput = function FormFieldInput(_ref) {
  var className = _ref.className,
      name = _ref.name,
      label = _ref.label,
      type = _ref.type,
      onChange = _ref.onChange,
      value = _ref.value,
      required = _ref.required,
      displayRequired = _ref.displayRequired,
      addon = _ref.addon;
  return _react2.default.createElement(
    "label",
    { className: (0, _classnames2.default)("chq-ffd", className), htmlFor: name },
    _react2.default.createElement(
      "span",
      { className: "chq-ffd--lb" },
      label
    ),
    addon && _react2.default.createElement(
      "span",
      { className: "chq-ffd--ad" },
      addon
    ),
    _react2.default.createElement("input", {
      type: type,
      id: name,
      name: name,
      onChange: onChange,
      value: value || "",
      required: required
    }),
    displayRequired && _react2.default.createElement(
      "p",
      { className: "chq-ffd--rq" },
      "Required"
    )
  );
};

exports.default = FormFieldInput;