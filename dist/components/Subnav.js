"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subnav = function (_Component) {
  _inherits(Subnav, _Component);

  function Subnav(props) {
    _classCallCheck(this, Subnav);

    var _this = _possibleConstructorReturn(this, (Subnav.__proto__ || Object.getPrototypeOf(Subnav)).call(this, props));

    var activeIndex = props.activeIndex;


    _this.state = { activeIndex: activeIndex || 0 };
    return _this;
  }

  _createClass(Subnav, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var onChange = this.props.onChange;
      var activeIndex = this.state.activeIndex;


      if (onChange && prevState.activeIndex !== activeIndex) {
        onChange(activeIndex);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(activeIndex) {
      this.setState({ activeIndex: activeIndex });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          givenIndex = _props.activeIndex,
          onChange = _props.onChange,
          props = _objectWithoutProperties(_props, ["children", "className", "activeIndex", "onChange"]);

      var currentIndex = this.state.activeIndex;


      var activeIndex = Number.isInteger(givenIndex) ? givenIndex : currentIndex;

      return _react2.default.createElement(
        "nav",
        _extends({ className: (0, _classnames2.default)(className, "chq-snv") }, props),
        _react2.default.Children.map(children, function (child, index) {
          return _react2.default.cloneElement(child, {
            active: index === activeIndex,
            onClick: function onClick() {
              return _this2.handleClick(index);
            }
          });
        })
      );
    }
  }]);

  return Subnav;
}(_react.Component);

Subnav.Item = function (_ref) {
  var children = _ref.children,
      className = _ref.className,
      active = _ref.active,
      props = _objectWithoutProperties(_ref, ["children", "className", "active"]);

  return _react2.default.createElement(
    "a",
    _extends({
      className: (0, _classnames2.default)(className, "chq-snv--it", { "chq-snv--it-active": active })
    }, props),
    children
  );
};

exports.default = Subnav;