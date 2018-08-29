"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringField = exports.PasswordField = exports.NumberField = exports.EmailField = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormField =
/*#__PURE__*/
function (_Component) {
  _inherits(FormField, _Component);

  function FormField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FormField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      error: null,
      focused: false,
      touched: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function () {
      _this.setState({
        focused: false,
        touched: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (_ref) {
      var value = _ref.target.value;
      var _this$props = _this.props,
          name = _this$props.name,
          onChange = _this$props.onChange,
          onFormChange = _this$props.onFormChange;

      if (onChange) {
        onChange(value);
      }

      if (onFormChange) {
        onFormChange(name, value);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function () {
      _this.setState({
        focused: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "deriveError", function () {
      var _this$props2 = _this.props,
          name = _this$props2.name,
          onError = _this$props2.onError,
          required = _this$props2.required,
          validator = _this$props2.validator,
          value = _this$props2.value;
      var error = null;

      if (required && !value) {
        error = "Required";
      } else if (validator) {
        error = validator(value);
      }

      _this.setState({
        error: error
      });

      if (onError) {
        onError(name, error);
      }
    });

    return _this;
  }

  _createClass(FormField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.deriveError();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var value = this.props.value;

      if (value !== prevProps.value) {
        this.deriveError();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          addon = _this$props3.addon,
          children = _this$props3.children,
          className = _this$props3.className,
          onError = _this$props3.onError,
          onChange = _this$props3.onChange,
          onFormChange = _this$props3.onFormChange,
          name = _this$props3.name,
          required = _this$props3.required,
          submitted = _this$props3.submitted,
          validator = _this$props3.validator,
          value = _this$props3.value,
          props = _objectWithoutProperties(_this$props3, ["addon", "children", "className", "onError", "onChange", "onFormChange", "name", "required", "submitted", "validator", "value"]);

      var _this$state = this.state,
          error = _this$state.error,
          focused = _this$state.focused,
          touched = _this$state.touched;
      var displayError = submitted || touched && !focused;
      return _react.default.createElement("label", {
        className: (0, _classnames.default)("chq-ffd", className),
        htmlFor: name
      }, _react.default.createElement("span", {
        className: "chq-ffd--lb"
      }, children), addon && _react.default.createElement("span", {
        className: "chq-ffd--ad"
      }, addon), _react.default.createElement("input", _extends({}, props, {
        id: name,
        name: name,
        value: value || "",
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleFocus
      })), error && displayError && _react.default.createElement("p", {
        className: "chq-ffd--rq"
      }, error));
    }
  }]);

  return FormField;
}(_react.Component);

var buildFormField = function buildFormField(type) {
  return function (props) {
    return _react.default.createElement(FormField, _extends({}, props, {
      type: type
    }));
  };
};

var EmailField = buildFormField("email");
exports.EmailField = EmailField;
var NumberField = buildFormField("number");
exports.NumberField = NumberField;
var PasswordField = buildFormField("password");
exports.PasswordField = PasswordField;
var StringField = buildFormField("text");
exports.StringField = StringField;