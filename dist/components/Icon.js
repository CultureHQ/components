"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncPath = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncPath = function (_Component) {
  _inherits(AsyncPath, _Component);

  function AsyncPath() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AsyncPath);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AsyncPath.__proto__ || Object.getPrototypeOf(AsyncPath)).call.apply(_ref, [this].concat(args))), _this), _this.state = { d: null }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AsyncPath, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentIsMounted = true;
      return this.loadIcon();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref2) {
      var icon = _ref2.icon;
      var prevIcon = this.props.icon;


      if (icon !== prevIcon) {
        this.loadIcon();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;
    }
  }, {
    key: "loadIcon",
    value: function loadIcon() {
      var _this2 = this;

      return import( /* webpackChunkName: "icons" */"../icons.json").then(function (paths) {
        var icon = _this2.props.icon;


        if (_this2.componentIsMounted) {
          _this2.setState({ d: paths[icon].join(" ") });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var d = this.state.d;

      return d ? _react2.default.createElement("path", { d: d }) : null;
    }
  }]);

  return AsyncPath;
}(_react.Component);

var Icon = function Icon(_ref3) {
  var icon = _ref3.icon,
      className = _ref3.className;
  return _react2.default.createElement(
    "svg",
    { width: "22px", height: "22px", viewBox: "0 0 1024 1024", className: className },
    _react2.default.createElement(AsyncPath, { icon: icon })
  );
};

exports.AsyncPath = AsyncPath;
exports.default = Icon;