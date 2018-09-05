"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _FormError = _interopRequireDefault(require("./FormError"));

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

var FileField =
/*#__PURE__*/
function (_Component) {
  _inherits(FileField, _Component);

  function FileField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FileField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FileField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      touched: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (_ref) {
      var files = _ref.target.files;

      _this.setState({
        touched: true
      });

      var _this$props = _this.props,
          multiple = _this$props.multiple,
          name = _this$props.name,
          onChange = _this$props.onChange,
          onFormChange = _this$props.onFormChange;
      var value = null;

      if (files.length > 0) {
        value = multiple ? files : files[0];
      }

      if (onChange) {
        onChange(value);
      }

      if (onFormChange) {
        onFormChange(name, value);
      }
    });

    return _this;
  }

  _createClass(FileField, [{
    key: "getFileDisplay",
    value: function getFileDisplay() {
      var _this$props2 = this.props,
          multiple = _this$props2.multiple,
          value = _this$props2.value;

      if (!value) {
        return "";
      }

      if (multiple) {
        return Array.from(value).map(function (_ref2) {
          var name = _ref2.name;
          return name;
        }).join(", ");
      }

      return value.name;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          multiple = _this$props3.multiple,
          name = _this$props3.name;

      var _this$props4 = this.props,
          children = _this$props4.children,
          className = _this$props4.className,
          onError = _this$props4.onError,
          onFormChange = _this$props4.onFormChange,
          required = _this$props4.required,
          submitted = _this$props4.submitted,
          validator = _this$props4.validator,
          value = _this$props4.value,
          props = _objectWithoutProperties(_this$props4, ["children", "className", "onError", "onFormChange", "required", "submitted", "validator", "value"]);

      var touched = this.state.touched;
      return _react.default.createElement("label", {
        className: (0, _classnames.default)("chq-ffd", className),
        htmlFor: name
      }, _react.default.createElement("span", {
        className: "chq-ffd--lb"
      }, children), _react.default.createElement("div", {
        className: "chq-ffd--fi"
      }, _react.default.createElement("input", _extends({}, props, {
        type: "file",
        id: name,
        onChange: this.handleChange
      })), _react.default.createElement("div", {
        className: "chq-ffd--di"
      }, _react.default.createElement("div", {
        className: "chq-ffd--ch"
      }, "Choose file", multiple && "s", "..."), _react.default.createElement("div", {
        className: "chq-ffd--fd"
      }, this.getFileDisplay()))), _react.default.createElement(_FormError.default, {
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

  return FileField;
}(_react.Component);

var _default = FileField;
exports.default = _default;