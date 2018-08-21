"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Spinner = require("./Spinner");

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_Component) {
  _inherits(Loader, _Component);

  function Loader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Loader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Loader.__proto__ || Object.getPrototypeOf(Loader)).call.apply(_ref, [this].concat(args))), _this), _this.state = { spinning: false }, _this.componentDidMount = function () {
      _this.componentIsMounted = true;

      _this.timeout = setTimeout(_this.handleSpinnerTriggered, 250);
    }, _this.handleSpinnerTriggered = function () {
      var loading = _this.props.loading;


      if (_this.componentIsMounted && loading) {
        _this.setState({ spinning: true });
      }

      _this.timeout = null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Loader, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          children = _props.children;
      var spinning = this.state.spinning;


      if (!loading) {
        return _react2.default.createElement(
          _react.Fragment,
          null,
          children
        );
      }

      if (spinning) {
        return _react2.default.createElement(_Spinner2.default, null);
      }

      return null;
    }
  }]);

  return Loader;
}(_react.Component);

exports.default = Loader;