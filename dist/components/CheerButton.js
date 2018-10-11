"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Cheer = _interopRequireDefault(require("./Cheer"));

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

var CheerButton =
/*#__PURE__*/
function (_Component) {
  _inherits(CheerButton, _Component);

  function CheerButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CheerButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CheerButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      toggling: false,
      touched: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function () {
      _this.setState({
        toggling: true,
        touched: true
      });

      var _this$props = _this.props,
          cheered = _this$props.cheered,
          onCheerToggle = _this$props.onCheerToggle;
      onCheerToggle(!cheered).then(function () {
        _this.setState({
          toggling: false
        });
      });
    });

    return _this;
  }

  _createClass(CheerButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          cheered = _this$props2.cheered,
          className = _this$props2.className,
          name = _this$props2.name,
          small = _this$props2.small;
      var _this$state = this.state,
          toggling = _this$state.toggling,
          touched = _this$state.touched;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("button", {
        type: "button",
        className: (0, _classnames.default)("chq-cbn", className, {
          "chq-cbn-ch": cheered,
          "chq-cbn-sm": small
        }),
        disabled: toggling,
        onClick: this.handleClick
      }, _react.default.createElement(_Cheer.default, null), !small && _react.default.createElement(_react.default.Fragment, null, " ", "Cheer!")), cheered && _react.default.createElement(_Cheer.default, {
        name: name,
        small: small,
        pop: touched
      }));
    }
  }]);

  return CheerButton;
}(_react.Component);

var _default = CheerButton;
exports.default = _default;