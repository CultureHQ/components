"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../../../classnames"));

var _PlainButton = _interopRequireDefault(require("../../buttons/PlainButton"));

var _DoorEffect = _interopRequireDefault(require("../../DoorEffect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCreatingOption = function isCreatingOption(_ref) {
  var display = _ref.display,
      multiple = _ref.multiple,
      options = _ref.options,
      value = _ref.value;
  var matchedLabel = options.some(function (option) {
    return option.label === display;
  });

  if (!multiple) {
    return !matchedLabel && display !== value;
  }

  return !matchedLabel && (!value || !value.some(function (item) {
    return item === display;
  }));
};

var SelectFieldOption = function SelectFieldOption(_ref2) {
  var active = _ref2.active,
      option = _ref2.option,
      onDeselect = _ref2.onDeselect,
      onSelect = _ref2.onSelect,
      tabIndex = _ref2.tabIndex;
  var label = option.label,
      value = option.value;
  var className = (0, _classnames.default)({
    "chq-ffd--sl--opt-act": active
  });

  var onClick = function onClick() {
    return (active ? onDeselect : onSelect)(value);
  };

  return _react.default.createElement(_PlainButton.default, {
    className: className,
    onClick: onClick,
    tabIndex: tabIndex
  }, label);
};

var SelectFieldOptions = function SelectFieldOptions(_ref3) {
  var creatable = _ref3.creatable,
      display = _ref3.display,
      filteredOptions = _ref3.filteredOptions,
      multiple = _ref3.multiple,
      onDeselect = _ref3.onDeselect,
      onSelect = _ref3.onSelect,
      open = _ref3.open,
      options = _ref3.options,
      value = _ref3.value;
  var createOption = creatable && isCreatingOption({
    display: display,
    multiple: multiple,
    options: options,
    value: value
  });
  return _react.default.createElement(_DoorEffect.default, {
    className: "chq-ffd--sl--opts",
    open: open
  }, createOption && display.length > 0 && _react.default.createElement(SelectFieldOption, {
    key: display,
    option: {
      label: "Create option: ".concat(display),
      value: display
    },
    onSelect: onSelect
  }), filteredOptions.map(function (option) {
    return _react.default.createElement(SelectFieldOption, {
      key: option.value,
      option: option,
      onDeselect: onDeselect,
      onSelect: onSelect,
      active: value && (multiple ? value.includes(option.value) : option.value === value),
      tabIndex: open ? 0 : -1
    });
  }), !createOption && filteredOptions.length === 0 && _react.default.createElement("p", null, "No results found."));
};

var _default = SelectFieldOptions;
exports.default = _default;