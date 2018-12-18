"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _locales = _interopRequireDefault(require("../../locales"));

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _Button = _interopRequireDefault(require("../buttons/Button"));

var _PlainButton = _interopRequireDefault(require("../buttons/PlainButton"));

var _ModalDialog = _interopRequireDefault(require("../modals/ModalDialog"));

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

var getStdTimezoneOffset = function getStdTimezoneOffset() {
  var date = new Date();
  var jan = new Date(date.getFullYear(), 0, 1);
  var jul = new Date(date.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

var padLeft = function padLeft(number) {
  return "0".concat(number).slice(-2);
};

var getDateWithOffset = function getDateWithOffset(value, offset) {
  return new Date(+new Date(value) + offset * 60 * 1000);
};

var makeDateTime = function makeDateTime(value, offset) {
  if (!value) {
    return null;
  }

  var date = getDateWithOffset(value, offset);
  var components = [_locales.default.en.monthNames[date.getUTCMonth()], " ", date.getUTCDate(), ", ", date.getUTCFullYear(), " ", date.getUTCHours() % 12 || 12, ":", padLeft(date.getUTCMinutes()), " ", date.getUTCHours() < 12 ? "AM" : "PM"];
  return components.join("");
};

var makeCalendarValue = function makeCalendarValue(value, offset) {
  var date = value ? new Date(value) : new Date();
  return new Date(+new Date(date) + offset * 60 * 1000);
};

var makeTimeSelectValue = function makeTimeSelectValue(value, offset) {
  if (!value) {
    return "12:0";
  }

  var date = new Date(value);
  var hours = (date.getUTCHours() + Math.floor(offset / 60) + 24) % 24;
  var minutes = Math.floor(date.getUTCMinutes() / 15) * 15 + offset % 60;
  return "".concat(hours, ":").concat(minutes);
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getValue", function () {
      var _this$props = _this.props,
          name = _this$props.name,
          value = _this$props.value,
          values = _this$props.values;
      return value || values[name];
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDateChange", function (year, month, day) {
      var offset = _this.props.offset;

      var value = _this.getValue();

      var date = getDateWithOffset(value ? new Date(value) : new Date(), offset);
      var inUTC = new Date([year, "-", padLeft(month + 1), "-", padLeft(day), "T", padLeft(value ? date.getUTCHours() : 12 - Math.floor(offset / 60)), ":", padLeft(value ? date.getUTCMinutes() : 0 - offset % 60), ":00", offset < 0 ? "-" : "+", padLeft(Math.abs(Math.floor(offset / 60))), ":", padLeft(Math.abs(offset % 60))].join(""));

      _this.propagateChange(inUTC.getUTCFullYear(), inUTC.getUTCMonth(), inUTC.getUTCDate(), inUTC.getUTCHours(), inUTC.getUTCMinutes());
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleTimeChange", function (hours, minutes) {
      var offset = _this.props.offset;

      var value = _this.getValue();

      var date = getDateWithOffset(value ? new Date(value) : new Date(), offset);
      var inUTC = new Date([date.getFullYear(), "-", padLeft(date.getUTCMonth() + 1), "-", padLeft(date.getUTCDate()), "T", padLeft(hours), ":", padLeft(minutes), ":00", offset < 0 ? "-" : "+", padLeft(Math.abs(Math.floor(offset / 60))), ":", padLeft(Math.abs(offset % 60))].join(""));

      _this.propagateChange(inUTC.getUTCFullYear(), inUTC.getUTCMonth(), inUTC.getUTCDate(), inUTC.getUTCHours(), inUTC.getUTCMinutes());

      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelect", function () {
      var offset = _this.props.offset;

      var value = _this.getValue();

      var date = value ? new Date(value) : new Date();

      _this.propagateChange(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), value ? date.getUTCHours() : 12 - Math.floor(offset / 60), value ? date.getUTCMinutes() : 0 - offset % 60);

      _this.handleClose();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "propagateChange", function (year, month, date, hours, minutes) {
      var _this$props2 = _this.props,
          name = _this$props2.name,
          onChange = _this$props2.onChange,
          onFormChange = _this$props2.onFormChange;
      var value = new Date(Date.UTC(year, month, date, hours, minutes, 0)).toISOString();
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
          offset = _this$props3.offset,
          required = _this$props3.required,
          submitted = _this$props3.submitted,
          validator = _this$props3.validator;
      var _this$state = this.state,
          open = _this$state.open,
          touched = _this$state.touched;
      var value = this.getValue();
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("label", {
        className: (0, _classnames.default)("chq-ffd", className),
        htmlFor: name
      }, _react.default.createElement("span", {
        className: "chq-ffd--lb"
      }, children), _react.default.createElement(_PlainButton.default, {
        "aria-label": "Open dialog",
        className: "chq-ffd--ctrl chq-ffd--dt",
        onClick: this.handleOpen
      }, makeDateTime(value, offset)), _react.default.createElement("input", {
        id: name,
        name: name,
        type: "hidden",
        value: value || ""
      })), open && _react.default.createElement(_ModalDialog.default, {
        className: "chq-ffd--dtmd",
        entrance: "zoomIn",
        onClose: this.handleClose
      }, _react.default.createElement(_ModalDialog.default.Heading, {
        onClose: this.handleClose
      }, children), _react.default.createElement(_ModalDialog.default.Body, null, _react.default.createElement(_Calendar.default, {
        value: makeCalendarValue(value, offset),
        onChange: this.handleDateChange
      }), _react.default.createElement(_TimeSelect.default, {
        value: makeTimeSelectValue(value, offset),
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
        value: value
      }));
    }
  }]);

  return DateTimeField;
}(_react.Component);

_defineProperty(DateTimeField, "defaultProps", {
  offset: -getStdTimezoneOffset(),
  onChange: function onChange() {},
  onFormChange: function onFormChange() {},
  values: {}
});

var _default = (0, _Form.withForm)(DateTimeField);

exports.default = _default;