"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _Button = _interopRequireDefault(require("../buttons/Button"));

var _PlainButton = _interopRequireDefault(require("../buttons/PlainButton"));

var _ModalDialog = _interopRequireDefault(require("../modals/ModalDialog"));

var _DateTimeFieldDisplay = _interopRequireDefault(require("./DateTimeFieldDisplay"));

var _FormError = _interopRequireDefault(require("./FormError"));

var _TimeSelect = _interopRequireDefault(require("./TimeSelect"));

var _Form = require("./Form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var normalizeTime = function normalizeTime(value) {
  if (value) {
    return {
      hours: value.getHours(),
      minutes: value.getMinutes()
    };
  }

  return {
    hours: 12,
    minutes: 0
  };
};

var DateTimeField =
/*#__PURE__*/
function (_Component) {
  _inherits(DateTimeField, _Component);

  function DateTimeField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateTimeField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateTimeField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false,
      touched: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDate", function () {
      var _this$props = _this.props,
          name = _this$props.name,
          value = _this$props.value,
          values = _this$props.values;
      var normal = values[name] || value;
      return normal ? new Date(normal) : null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpen", function () {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDateChange", function (date) {
      _this.propagateChange(date, normalizeTime(_this.getDate()));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTimeChange", function (hours, minutes) {
      _this.propagateChange(_this.getDate() || new Date(), {
        hours: hours,
        minutes: minutes
      });

      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelect", function () {
      var normalValue = _this.getDate();

      _this.propagateChange(normalValue || new Date(), normalizeTime(normalValue));

      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "propagateChange", function (date, time) {
      var _this$props2 = _this.props,
          name = _this$props2.name,
          onChange = _this$props2.onChange,
          onFormChange = _this$props2.onFormChange;
      var value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes, 0).toISOString();
      onChange(value);
      onFormChange(name, value);
    });

    return _this;
  }

  _createClass(DateTimeField, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          className = _this$props3.className,
          onError = _this$props3.onError,
          name = _this$props3.name,
          required = _this$props3.required,
          submitted = _this$props3.submitted,
          value = _this$props3.value,
          values = _this$props3.values,
          validator = _this$props3.validator;
      var _this$state = this.state,
          open = _this$state.open,
          touched = _this$state.touched;
      var normal = values[name] || value;
      var currentDate = this.getDate();
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("label", {
        className: (0, _classnames.default)("chq-ffd", className),
        htmlFor: name
      }, _react.default.createElement("span", {
        className: "chq-ffd--lb"
      }, children), _react.default.createElement(_PlainButton.default, {
        "aria-label": "Open dialog",
        className: "chq-ffd--ctrl",
        onClick: this.handleOpen
      }, _react.default.createElement(_DateTimeFieldDisplay.default, {
        value: currentDate
      })), _react.default.createElement("input", {
        id: name,
        name: name,
        type: "hidden",
        value: currentDate ? currentDate.toISOString() : ""
      })), open && _react.default.createElement(_ModalDialog.default, {
        className: "chq-ffd--dtmd",
        entrance: "zoomIn",
        onClose: this.handleClose
      }, _react.default.createElement(_ModalDialog.default.Heading, {
        onClose: this.handleClose
      }, children), _react.default.createElement(_ModalDialog.default.Body, null, _react.default.createElement(_Calendar.default, {
        value: currentDate,
        onChange: this.handleDateChange
      }), _react.default.createElement(_TimeSelect.default, {
        value: currentDate,
        onChange: this.handleTimeChange
      })), _react.default.createElement(_ModalDialog.default.Footer, null, _react.default.createElement(_Button.default, {
        primary: true,
        onClick: this.handleSelect
      }, "Select"))), _react.default.createElement(_FormError.default, {
        name: name,
        onError: onError,
        required: required,
        submitted: submitted,
        touched: touched,
        validator: validator,
        value: normal
      }));
    }
  }]);

  return DateTimeField;
}(_react.Component);

_defineProperty(DateTimeField, "defaultProps", {
  onChange: function onChange() {},
  onFormChange: function onFormChange() {},
  values: {}
});

var _default = (0, _Form.withForm)(DateTimeField);

exports.default = _default;