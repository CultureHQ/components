"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _SelectFieldCaret = _interopRequireDefault(require("./SelectFieldCaret"));

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

var SelectFieldSingleValue =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectFieldSingleValue, _Component);

  function SelectFieldSingleValue() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectFieldSingleValue);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectFieldSingleValue)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _this$props = _this.props,
          onClose = _this$props.onClose,
          onOpen = _this$props.onOpen,
          open = _this$props.open;

      switch (event.key) {
        case "Enter":
          if (!open) {
            onOpen();
          }

          break;

        case "Escape":
          if (open) {
            onClose();
          }

          break;

        default:
          break;
      }
    });

    return _this;
  }

  _createClass(SelectFieldSingleValue, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          display = _this$props2.display,
          inputRef = _this$props2.inputRef,
          name = _this$props2.name,
          onChange = _this$props2.onChange,
          onOpen = _this$props2.onOpen,
          open = _this$props2.open,
          placeholder = _this$props2.placeholder,
          value = _this$props2.value;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", {
        "aria-label": name,
        type: "hidden",
        id: name,
        name: name,
        value: value || ""
      }), _react.default.createElement("input", {
        "aria-label": "Value",
        type: "text",
        ref: inputRef,
        className: "chq-ffd--ctrl",
        onClick: onOpen,
        onChange: onChange,
        onKeyDown: this.handleKeyDown,
        placeholder: placeholder,
        value: display
      }), _react.default.createElement(_SelectFieldCaret.default, {
        open: open
      }));
    }
  }]);

  return SelectFieldSingleValue;
}(_react.Component);

var _default = SelectFieldSingleValue;
exports.default = _default;