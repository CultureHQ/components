"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _TimeSelectOption = _interopRequireDefault(require("./TimeSelectOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var padLeft = function padLeft(number) {
  return "0".concat(number).slice(-2);
};

var TIME_SELECT_OPTIONS = [];

for (var hours = 0; hours < 24; hours += 1) {
  for (var minutes = 0; minutes < 60; minutes += 15) {
    var meridian = hours < 12 ? "AM" : "PM";
    TIME_SELECT_OPTIONS.push({
      label: "".concat(padLeft(hours % 12 || 12), ":").concat(padLeft(minutes), " ").concat(meridian),
      value: "".concat(hours, ":").concat(minutes)
    });
  }
}

var TimeSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(TimeSelect, _Component);

  function TimeSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimeSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimeSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "activeOptionRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "selectRef", _react.default.createRef());

    return _this;
  }

  _createClass(TimeSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var option = this.activeOptionRef.current;
      var select = this.selectRef.current;

      if (option && select) {
        select.scrollTop = Math.max(0, option.offsetTop - select.offsetTop - 46);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange;
      return _react.default.createElement("div", {
        className: "chq-tsl",
        ref: this.selectRef
      }, TIME_SELECT_OPTIONS.map(function (option) {
        return _react.default.createElement(_TimeSelectOption.default, {
          key: option.value,
          option: option,
          value: value,
          onClick: onChange,
          activeOptionRef: _this2.activeOptionRef
        });
      }));
    }
  }]);

  return TimeSelect;
}(_react.Component);

var _default = TimeSelect;
exports.default = _default;