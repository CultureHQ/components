"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _locales = _interopRequireDefault(require("../locales"));

var _CalendarDays = _interopRequireDefault(require("./calendar/CalendarDays"));

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

var getStartOfMonth = function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

var hashMonth = function hashMonth(date) {
  return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1);
};

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePrevMonthClick", function () {
      _this.setState(function (_ref) {
        var visibleValue = _ref.visibleValue;
        var nextVisibleValue = new Date(visibleValue);
        nextVisibleValue.setMonth(nextVisibleValue.getMonth() - 1);
        return {
          visibleValue: nextVisibleValue
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNextMonthClick", function () {
      _this.setState(function (_ref2) {
        var visibleValue = _ref2.visibleValue;
        var nextVisibleValue = new Date(visibleValue);
        nextVisibleValue.setMonth(nextVisibleValue.getMonth() + 1);
        return {
          visibleValue: nextVisibleValue
        };
      });
    });

    _this.state = {
      visibleValue: getStartOfMonth(props.value || new Date())
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var value = this.props.value;
      var visibleValue = this.state.visibleValue;

      if (prevProps.value !== value && hashMonth(value) !== hashMonth(visibleValue)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          visibleValue: getStartOfMonth(value)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onChange = _this$props.onChange,
          value = _this$props.value;
      var visibleValue = this.state.visibleValue;
      return _react.default.createElement("div", {
        className: "chq-cal"
      }, _react.default.createElement("div", {
        className: "chq-cal--head"
      }, _react.default.createElement("button", {
        type: "button",
        className: "chq-cal--head--prev",
        onClick: this.handlePrevMonthClick
      }, _react.default.createElement("em", {
        className: "chq-cal--head--ct"
      }), "\xA0"), _react.default.createElement("button", {
        type: "button",
        className: "chq-cal--head--next",
        onClick: this.handleNextMonthClick
      }, _react.default.createElement("em", {
        className: "chq-cal--head--ct"
      }), "\xA0"), _react.default.createElement("div", {
        className: "chq-cal--head--lbl"
      }, _locales.default.en.monthNames[visibleValue.getMonth()], " ", visibleValue.getFullYear())), _react.default.createElement("div", {
        className: "chq-cal--months"
      }, _locales.default.en.dayAbbrs.map(function (abbr) {
        return _react.default.createElement("strong", {
          key: abbr
        }, abbr);
      })), _react.default.createElement("div", {
        className: "chq-cal--days"
      }, _react.default.createElement(_CalendarDays.default, {
        value: value || new Date(),
        visibleValue: visibleValue,
        onChange: onChange
      })));
    }
  }]);

  return Calendar;
}(_react.Component);

var _default = Calendar;
exports.default = _default;