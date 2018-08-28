"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AsyncPath = void 0;

var _react = _interopRequireWildcard(require("react"));

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

var AsyncPath =
/*#__PURE__*/
function (_Component) {
  _inherits(AsyncPath, _Component);

  function AsyncPath() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AsyncPath);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AsyncPath)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      d: null
    });

    return _this;
  }

  _createClass(AsyncPath, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentIsMounted = true;
      return this.loadIcon();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref) {
      var icon = _ref.icon;
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

      return import(
      /* webpackChunkName: "icons" */
      "../icons.json").then(function (paths) {
        var icon = _this2.props.icon;

        if (_this2.componentIsMounted) {
          _this2.setState({
            d: paths[icon].join(" ")
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var d = this.state.d;
      return d ? _react.default.createElement("path", {
        d: d
      }) : null;
    }
  }]);

  return AsyncPath;
}(_react.Component);

exports.AsyncPath = AsyncPath;

var Icon = function Icon(_ref2) {
  var icon = _ref2.icon,
      className = _ref2.className;
  return _react.default.createElement("svg", {
    width: "22px",
    height: "22px",
    viewBox: "0 0 1024 1024",
    className: className
  }, _react.default.createElement(AsyncPath, {
    icon: icon
  }));
};

var _default = Icon;
exports.default = _default;