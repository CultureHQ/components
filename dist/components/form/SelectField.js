"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _FormError = _interopRequireDefault(require("./FormError"));

var _SelectFieldValue = _interopRequireDefault(require("./select/SelectFieldValue"));

var _SelectFieldOptions = _interopRequireDefault(require("./select/SelectFieldOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var appendValue = function appendValue(value, selected) {
  return value ? _toConsumableArray(value.filter(function (item) {
    return item !== selected;
  })).concat([selected]) : [selected];
};

var fuzzyFilter = function fuzzyFilter(matchable) {
  var terms = matchable.toLowerCase().split(" ").filter(Boolean);
  return function (_ref) {
    var label = _ref.label;
    return label.toLowerCase().split(" ").filter(Boolean).some(function (segment) {
      return terms.some(function (term) {
        return segment.startsWith(term);
      });
    });
  };
};

var SelectField =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectField, _Component);

  function SelectField(props) {
    var _this;

    _classCallCheck(this, SelectField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectField).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWindowClick", function (event) {
      var value = _this.props.value;
      var open = _this.state.open;

      if (open && !_this.selectRef.current.contains(event.target)) {
        _this.selectValue(value, true);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelect", function (selected) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          value = _this$props.value;
      var nextValue = multiple ? appendValue(value, selected) : selected;

      _this.inputRef.current.focus();

      _this.selectValue(nextValue, !multiple);

      _this.propagateValue(nextValue);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDeselect", function (deselected) {
      var _this$props2 = _this.props,
          multiple = _this$props2.multiple,
          value = _this$props2.value;
      var nextValue = multiple ? value.filter(function (item) {
        return item !== deselected;
      }) : "";

      _this.inputRef.current.focus();

      _this.selectValue(nextValue, !multiple);

      _this.propagateValue(nextValue);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (event) {
      var _this$props3 = _this.props,
          multiple = _this$props3.multiple,
          options = _this$props3.options,
          value = _this$props3.value;
      var display = _this.state.display;
      var nextDisplay = event.target.value;

      if (!multiple) {
        var currentOption = value && options.find(function (option) {
          return option.value === value;
        }) || {};
        nextDisplay = currentOption.label === display ? event.nativeEvent.data : nextDisplay;
      }

      _this.setState({
        display: nextDisplay || "",
        filteredOptions: nextDisplay ? options.filter(fuzzyFilter(nextDisplay)) : options,
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpen", function () {
      var multiple = _this.props.multiple;

      if (multiple) {
        _this.inputRef.current.focus();
      }

      _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        open: false,
        touched: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "propagateValue", function (value) {
      var _this$props4 = _this.props,
          name = _this$props4.name,
          onChange = _this$props4.onChange,
          onFormChange = _this$props4.onFormChange;
      onChange(value);
      onFormChange(name, value);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectValue", function (nextValue, shouldClose) {
      var _this$props5 = _this.props,
          multiple = _this$props5.multiple,
          options = _this$props5.options;
      var effects = shouldClose ? {
        open: false
      } : {};
      var display = "";

      if (!multiple) {
        display = options.find(function (_ref2) {
          var value = _ref2.value;
          return value === nextValue;
        });
        display = display ? display.label : nextValue || "";
      }

      _this.setState(_objectSpread({
        display: display,
        touched: true
      }, effects), function () {
        return setTimeout(function () {
          return _this.setState({
            filteredOptions: options
          });
        }, 150);
      });
    });

    var _display = "";

    if (!props.multiple && props.value !== undefined) {
      _display = props.options.find(function (_ref3) {
        var value = _ref3.value;
        return value === props.value;
      });
      _display = _display ? _display.label : "";
    }

    _this.state = {
      display: _display,
      filteredOptions: props.options,
      open: false,
      touched: false
    };
    return _this;
  }

  _createClass(SelectField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var autoFocus = this.props.autoFocus;

      if (autoFocus) {
        this.inputRef.current.focus();
      }

      window.addEventListener("click", this.handleWindowClick);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("click", this.handleWindowClick);
    }
  }, {
    key: "render",

    /* eslint-disable jsx-a11y/label-has-for */
    // we're following the rules for it but it can't figure that out
    value: function render() {
      var _this$props6 = this.props,
          children = _this$props6.children,
          className = _this$props6.className,
          creatable = _this$props6.creatable,
          multiple = _this$props6.multiple,
          name = _this$props6.name,
          onError = _this$props6.onError,
          options = _this$props6.options,
          required = _this$props6.required,
          submitted = _this$props6.submitted,
          validator = _this$props6.validator,
          value = _this$props6.value;
      var _this$state = this.state,
          display = _this$state.display,
          filteredOptions = _this$state.filteredOptions,
          open = _this$state.open,
          touched = _this$state.touched;
      return _react.default.createElement("label", {
        className: (0, _classnames.default)("chq-ffd", className),
        htmlFor: name
      }, _react.default.createElement("span", {
        className: "chq-ffd--lb"
      }, children), _react.default.createElement("div", {
        ref: this.selectRef,
        className: "chq-ffd--sl"
      }, _react.default.createElement(_SelectFieldValue.default, {
        display: display,
        inputRef: this.inputRef,
        multiple: multiple,
        name: name,
        onChange: this.handleChange,
        onClose: this.handleClose,
        onDeselect: this.handleDeselect,
        onOpen: this.handleOpen,
        open: open,
        options: options,
        value: value
      }), _react.default.createElement(_SelectFieldOptions.default, {
        creatable: creatable,
        display: display,
        filteredOptions: filteredOptions,
        multiple: multiple,
        onDeselect: this.handleDeselect,
        onSelect: this.handleSelect,
        open: open,
        options: options,
        value: value
      })), _react.default.createElement(_FormError.default, {
        name: name,
        onError: onError,
        required: required,
        submitted: submitted,
        touched: touched,
        validator: validator,
        value: value
      }));
    }
  }]);

  return SelectField;
}(_react.Component);

_defineProperty(SelectField, "defaultProps", {
  autoFocus: false,
  creatable: false,
  multiple: false,
  onChange: function onChange() {},
  onFormChange: function onFormChange() {},
  options: []
});

var _default = SelectField;
exports.default = _default;