"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _FormFieldInput = _interopRequireDefault(require("./FormFieldInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CentsField =
/*#__PURE__*/
function (_Component) {
  _inherits(CentsField, _Component);

  function CentsField(props) {
    var _this;

    _classCallCheck(this, CentsField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CentsField).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (_ref) {
      var value = _ref.target.value;
      var _this$props = _this.props,
          name = _this$props.name,
          onValueChange = _this$props.onValueChange;
      var amount = value ? Math.round(value * 100) : null;

      if (onValueChange) {
        onValueChange(_defineProperty({}, name, amount));
      }

      _this.setState({
        touched: true,
        value: amount
      });
    });

    _this.state = {
      touched: false,
      value: (props.initialValues || {})[props.name] || null
    };
    return _this;
  }

  _createClass(CentsField, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var touched = this.props.touched;

      if (touched !== prevProps.touched) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          touched: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var required = this.props.required;
      var _this$state = this.state,
          touched = _this$state.touched,
          value = _this$state.value;
      return _react.default.createElement(_FormFieldInput.default, _extends({}, this.props, {
        type: "number",
        step: "0.01",
        min: "0",
        addon: "$",
        onChange: this.handleChange,
        value: Number.isFinite(value) ? value / 100 : "",
        displayRequired: required && touched && !value
      }));
    }
  }]);

  return CentsField;
}(_react.Component);

var _default = CentsField;
exports.default = _default;