"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ConfirmDelete = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _Button = _interopRequireDefault(require("../Button"));

var _ModalDialog = _interopRequireDefault(require("./ModalDialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Confirm =
/*#__PURE__*/
function (_Component) {
  _inherits(Confirm, _Component);

  function Confirm(props) {
    var _this;

    _classCallCheck(this, Confirm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Confirm).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOpen", function () {
      var onOpen = _this.props.onOpen;

      if (onOpen) {
        onOpen();
      }

      _this.setState({
        open: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAccept", function () {
      var onAccept = _this.props.onAccept;

      _this.setState({
        open: false
      });

      onAccept();
    });

    _this.state = {
      open: props.startOpen || false
    };
    return _this;
  }

  _createClass(Confirm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$accept = _this$props.accept,
          accept = _this$props$accept === void 0 ? "Yes" : _this$props$accept,
          children = _this$props.children,
          className = _this$props.className,
          contentRef = _this$props.contentRef,
          danger = _this$props.danger,
          entrance = _this$props.entrance,
          trigger = _this$props.trigger;
      var open = this.state.open;
      var classList = (0, _classnames.default)("chq-cnf", className);
      return _react.default.createElement(_react.default.Fragment, null, trigger(this.handleOpen), open && _react.default.createElement(_ModalDialog.default, {
        className: classList,
        contentRef: contentRef,
        entrance: entrance,
        onClose: this.handleClose
      }, _react.default.createElement(_ModalDialog.default.Body, null, children), _react.default.createElement(_ModalDialog.default.Footer, null, _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
        inverted: true,
        onClick: this.handleClose
      }, "Cancel")), _react.default.createElement("div", null, _react.default.createElement(_Button.default, {
        primary: true,
        danger: danger,
        onClick: this.handleAccept
      }, accept)))));
    }
  }]);

  return Confirm;
}(_react.Component);

var ConfirmDelete = function ConfirmDelete(props) {
  return _react.default.createElement(Confirm, _extends({
    accept: "Delete",
    danger: true
  }, props));
};

exports.ConfirmDelete = ConfirmDelete;
var _default = Confirm;
exports.default = _default;