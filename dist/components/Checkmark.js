"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkmark = function (_Component) {
  _inherits(Checkmark, _Component);

  function Checkmark() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkmark);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkmark.__proto__ || Object.getPrototypeOf(Checkmark)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      var _this$props = _this.props,
          checked = _this$props.checked,
          onClick = _this$props.onClick;


      onClick(!checked);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Checkmark, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          checked = _props.checked,
          onClick = _props.onClick;


      return _react2.default.createElement(
        "button",
        {
          type: "button",
          className: (0, _classnames2.default)(className, "chq-cmk", {
            "chq-cmk-ck": checked,
            "chq-cmk-cl": onClick
          }),
          onClick: onClick ? this.handleClick : null
        },
        _react2.default.createElement(
          "svg",
          { viewBox: "0 0 52 52" },
          _react2.default.createElement("circle", { cx: "26", cy: "26", r: "25", fill: "none" }),
          _react2.default.createElement("path", { fill: "none", d: "M14.1 27.2l7.1 7.2 16.7-16.8" })
        )
      );
    }
  }]);

  return Checkmark;
}(_react.Component);

exports.default = Checkmark;