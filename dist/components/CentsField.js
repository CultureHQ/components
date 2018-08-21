"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FormFieldInput = require("./FormFieldInput");

var _FormFieldInput2 = _interopRequireDefault(_FormFieldInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CentsField = function (_Component) {
  _inherits(CentsField, _Component);

  function CentsField(props) {
    _classCallCheck(this, CentsField);

    var _this = _possibleConstructorReturn(this, (CentsField.__proto__ || Object.getPrototypeOf(CentsField)).call(this, props));

    _this.handleChange = function (_ref) {
      var value = _ref.target.value;
      var _this$props = _this.props,
          name = _this$props.name,
          onValueChange = _this$props.onValueChange;

      var amount = value ? Math.round(value * 100) : null;

      if (onValueChange) {
        onValueChange(_defineProperty({}, name, amount));
      }

      _this.setState({ touched: true, value: amount });
    };

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
        this.setState({ touched: true });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var required = this.props.required;
      var _state = this.state,
          touched = _state.touched,
          value = _state.value;


      return _react2.default.createElement(_FormFieldInput2.default, _extends({}, this.props, {
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

exports.default = CentsField;