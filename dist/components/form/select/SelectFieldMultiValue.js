"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../../classnames"));

var _Badge = _interopRequireDefault(require("../../buttons/Badge"));

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

var SelectFieldMultiValueBadge = function SelectFieldMultiValueBadge(_ref) {
  var option = _ref.option,
      onDeselect = _ref.onDeselect;
  var label = option.label,
      value = option.value;

  var onClick = function onClick(event) {
    event.stopPropagation();
    onDeselect(value);
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Badge.default, {
    icon: "close",
    onClick: onClick
  }, label), " ");
};

var SelectFieldMultiValue =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectFieldMultiValue, _Component);

  function SelectFieldMultiValue() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SelectFieldMultiValue);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectFieldMultiValue)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      event.stopPropagation();
      var _this$props = _this.props,
          display = _this$props.display,
          onClose = _this$props.onClose,
          onDeselect = _this$props.onDeselect,
          onOpen = _this$props.onOpen,
          open = _this$props.open,
          value = _this$props.value;

      switch (event.key) {
        case "Backspace":
          if (!display && value) {
            onDeselect(value[value.length - 1]);
          }

          break;

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

  _createClass(SelectFieldMultiValue, [{
    key: "getCurrentOptions",
    value: function getCurrentOptions() {
      var _this$props2 = this.props,
          options = _this$props2.options,
          value = _this$props2.value;

      if (!value) {
        return [];
      }

      return value.map(function (item) {
        return options.find(function (option) {
          return option.value === item;
        }) // given option
        || {
          label: item,
          value: item // created option

        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          display = _this$props3.display,
          inputRef = _this$props3.inputRef,
          name = _this$props3.name,
          onChange = _this$props3.onChange,
          onDeselect = _this$props3.onDeselect,
          onOpen = _this$props3.onOpen,
          open = _this$props3.open,
          placeholder = _this$props3.placeholder;
      var className = (0, _classnames.default)("chq-ffd--ctrl", {
        "chq-ffd--ctrl-fc": open
      });
      var currentOptions = this.getCurrentOptions();
      return _react.default.createElement("div", {
        role: "button",
        tabIndex: 0,
        onClick: onOpen,
        onKeyDown: this.handleKeyDown,
        className: className
      }, currentOptions.map(function (option, index) {
        return _react.default.createElement(_react.Fragment, {
          key: option.value
        }, _react.default.createElement("input", {
          "aria-label": "".concat(name, " ").concat(index),
          type: "hidden",
          id: "".concat(name, "[").concat(index, "]"),
          name: "".concat(name, "[]"),
          value: option.value
        }), _react.default.createElement(SelectFieldMultiValueBadge, {
          option: option,
          onDeselect: onDeselect
        }));
      }), _react.default.createElement("input", {
        "aria-label": "Search",
        type: "text",
        className: "chq-ffd--sl--match",
        ref: inputRef,
        onChange: onChange,
        onKeyDown: this.handleKeyDown,
        placeholder: placeholder,
        value: display
      }), _react.default.createElement(_SelectFieldCaret.default, {
        open: open
      }));
    }
  }]);

  return SelectFieldMultiValue;
}(_react.Component);

var _default = SelectFieldMultiValue;
exports.default = _default;