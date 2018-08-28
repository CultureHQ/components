"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

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
  return _react.default.createElement("label", {
    className: (0, _classnames.default)("chq-ffd", className),
    htmlFor: name
  }, _react.default.createElement("span", {
    className: "chq-ffd--lb"
  }, label), addon && _react.default.createElement("span", {
    className: "chq-ffd--ad"
  }, addon), _react.default.createElement("input", {
    type: type,
    id: name,
    name: name,
    onChange: onChange,
    value: value || "",
    required: required
  }), displayRequired && _react.default.createElement("p", {
    className: "chq-ffd--rq"
  }, "Required"));
};

var _default = FormFieldInput;
exports.default = _default;