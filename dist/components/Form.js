"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.state = { submitting: false, touched: false, values: {} }, _this.getIsValidSubmission = function () {
      var children = _this.props.children;
      var values = _this.state.values;


      return children.every(function (_ref2) {
        var _ref2$props = _ref2.props,
            required = _ref2$props.required,
            name = _ref2$props.name;
        return !required || values[name];
      });
    }, _this.handleValueChange = function (mutation) {
      _this.setState(function (_ref3) {
        var values = _ref3.values;
        return { values: _extends({}, values, mutation) };
      });
    }, _this.handleSubmit = function (event) {
      var onSubmit = _this.props.onSubmit;
      var values = _this.state.values;


      event.preventDefault();

      if (!_this.getIsValidSubmission()) {
        _this.setState({ touched: true });
        return false;
      }

      _this.setState({ submitting: true });
      var doneSubmitting = function doneSubmitting() {
        return _this.setState({ submitting: false });
      };

      onSubmit(values).then(doneSubmitting).catch(doneSubmitting);
      return true;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className;
      var _state = this.state,
          submitting = _state.submitting,
          touched = _state.touched;


      return _react2.default.createElement(
        "form",
        { className: (0, _classnames2.default)(className), onSubmit: this.handleSubmit },
        _react2.default.Children.map(children, function (child) {
          return _react2.default.cloneElement(child, {
            onValueChange: _this2.handleValueChange,
            touched: touched
          });
        }),
        _react2.default.createElement(
          _Button2.default,
          {
            primary: true,
            type: "submit",
            disabled: submitting,
            onClick: this.handleSubmit
          },
          "Submit"
        )
      );
    }
  }]);

  return Form;
}(_react.Component);

exports.default = Form;