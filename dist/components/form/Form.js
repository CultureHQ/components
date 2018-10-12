"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _SubmitButton = _interopRequireDefault(require("./SubmitButton"));

var _BooleanField = _interopRequireDefault(require("./BooleanField"));

var _CentsField = _interopRequireDefault(require("./CentsField"));

var _FileField = _interopRequireDefault(require("./FileField"));

var _ImageField = _interopRequireDefault(require("./ImageField"));

var _SelectField = _interopRequireDefault(require("./SelectField"));

var _FormFields = require("./FormFields");

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

var contains = function contains(haystack) {
  return function (needle) {
    return haystack.indexOf(needle) > -1;
  };
};

var isField = contains([_CentsField.default, _FormFields.EmailField, _FileField.default, _ImageField.default, _FormFields.NumberField, _FormFields.PasswordField, _SelectField.default, _FormFields.StringField]);

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(_props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, _props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getChildren", function () {
      var children = _this.props.children;
      var _this$state = _this.state,
          submitted = _this$state.submitted,
          submitting = _this$state.submitting,
          values = _this$state.values;
      return _react.default.Children.map(children, function (child) {
        if (!child) {
          return child;
        }

        var type = child.type,
            props = child.props;

        if (isField(type)) {
          return _react.default.cloneElement(child, {
            onError: _this.handleError,
            onFormChange: _this.handleFormChange,
            submitted: submitted,
            value: values[props.name]
          });
        }

        if (type === _BooleanField.default) {
          return _react.default.cloneElement(child, {
            onFormChange: _this.handleFormChange,
            value: values[props.name]
          });
        }

        if (type === _SubmitButton.default) {
          return _react.default.cloneElement(child, {
            submitting: submitting
          });
        }

        return child;
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleError", function (name, error) {
      _this.setState(function (_ref) {
        var errors = _ref.errors;
        return {
          errors: _objectSpread({}, errors, _defineProperty({}, name, error))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFormChange", function (name, value) {
      _this.setState(function (_ref2) {
        var values = _ref2.values;
        return {
          values: _objectSpread({}, values, _defineProperty({}, name, value))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (event) {
      event.preventDefault();

      _this.submit();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDoneSubmitting", function () {
      if (_this.componentIsMounted) {
        _this.setState({
          submitting: false
        });
      }
    });

    _this.state = {
      submitted: false,
      submitting: false,
      values: _props.initialValues || {},
      errors: {}
    };
    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentIsMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
    }
  }, {
    key: "submit",
    value: function submit() {
      var onSubmit = this.props.onSubmit;
      var _this$state2 = this.state,
          errors = _this$state2.errors,
          values = _this$state2.values;
      this.setState({
        submitted: true
      });

      if (Object.keys(errors).every(function (name) {
        return !errors[name];
      })) {
        this.setState({
          submitting: true
        });
        var submitted = onSubmit(values);

        if (submitted && submitted.then) {
          submitted.then(this.handleDoneSubmitting).catch(this.handleDoneSubmitting);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className;
      return _react.default.createElement("form", {
        className: (0, _classnames.default)(className),
        onSubmit: this.handleSubmit
      }, this.getChildren());
    }
  }]);

  return Form;
}(_react.Component);

var _default = Form;
exports.default = _default;