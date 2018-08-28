"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Button = _interopRequireDefault(require("./Button"));

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

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getIsValidSubmission", function () {
      var children = _this.props.children;
      var values = _this.state.values;
      return children.every(function (_ref) {
        var _ref$props = _ref.props,
            required = _ref$props.required,
            name = _ref$props.name;
        return !required || values[name];
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleValueChange", function (mutation) {
      _this.setState(function (_ref2) {
        var values = _ref2.values;
        return {
          values: _objectSpread({}, values, mutation)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (event) {
      var onSubmit = _this.props.onSubmit;
      var values = _this.state.values;
      event.preventDefault();

      if (!_this.getIsValidSubmission()) {
        _this.setState({
          touched: true
        });

        return false;
      }

      _this.setState({
        submitting: true
      });

      var doneSubmitting = function doneSubmitting() {
        return _this.setState({
          submitting: false
        });
      };

      onSubmit(values).then(doneSubmitting).catch(doneSubmitting);
      return true;
    });

    _this.state = {
      submitting: false,
      touched: false,
      values: props.initialValues || {}
    };
    return _this;
  }

  _createClass(Form, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          initialValues = _this$props.initialValues;
      var _this$state = this.state,
          submitting = _this$state.submitting,
          touched = _this$state.touched;
      return _react.default.createElement("form", {
        className: (0, _classnames.default)(className),
        onSubmit: this.handleSubmit
      }, _react.default.Children.map(children, function (child) {
        return _react.default.cloneElement(child, {
          onValueChange: _this2.handleValueChange,
          initialValues: initialValues,
          touched: touched
        });
      }), _react.default.createElement(_Button.default, {
        primary: true,
        type: "submit",
        disabled: submitting,
        onClick: this.handleSubmit
      }, "Submit"));
    }
  }]);

  return Form;
}(_react.Component);

var _default = Form;
exports.default = _default;