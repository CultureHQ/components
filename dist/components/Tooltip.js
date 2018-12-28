"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bubble", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "tooltip", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "triangle", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "computeOffsets", function () {
      var bubble = _this.bubble.current;
      var tooltip = _this.tooltip.current;
      var triangle = _this.triangle.current; // In the case that this component is not mounted, it can get into a state
      // where the refs are invalid.

      if (!bubble || !tooltip || !triangle) {
        return;
      }

      bubble.style.visibility = "hidden";
      bubble.style.display = "table";
      var bubbleOffset = -Math.abs((bubble.offsetWidth - tooltip.offsetWidth) / 2);

      if (bubble.offsetWidth / 2 > tooltip.offsetLeft) {
        bubbleOffset = 10 - tooltip.offsetLeft;
        var triangleMiddle = (tooltip.offsetWidth - triangle.offsetWidth) / 2;
        triangle.style.left = "".concat(tooltip.offsetLeft - 10 + triangleMiddle, "px");
      }

      bubble.style.left = "".concat(bubbleOffset, "px");
      bubble.style.display = null;
      bubble.style.visibility = null;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "recomputeOffsets", function () {
      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }

      _this.timeout = setTimeout(_this.requestComputeOffsets, 1000);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "requestComputeOffsets", function () {
      window.requestAnimationFrame(_this.computeOffsets);
    });

    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.requestComputeOffsets();
      window.addEventListener("resize", this.recomputeOffsets);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var tip = this.props.tip;

      if (tip !== prevProps.tip) {
        this.requestComputeOffsets();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.recomputeOffsets);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          tip = _this$props.tip;
      return _react.default.createElement("span", {
        className: "chq-ttp",
        ref: this.tooltip
      }, children, _react.default.createElement("span", {
        className: "chq-ttp--bbl",
        ref: this.bubble
      }, tip, _react.default.createElement("span", {
        className: "chq-ttp--tri",
        ref: this.triangle
      })));
    }
  }]);

  return Tooltip;
}(_react.Component);

var _default = Tooltip;
exports.default = _default;