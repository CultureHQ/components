"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

var _Icon = _interopRequireDefault(require("./Icon"));

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

var SearchBar =
/*#__PURE__*/
function (_Component) {
  _inherits(SearchBar, _Component);

  function SearchBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SearchBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SearchBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "timeout", 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      search: "",
      searching: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (_ref) {
      var search = _ref.target.value;
      var onSearchChange = _this.props.onSearchChange;
      onSearchChange(search);

      _this.setState({
        search: search,
        searching: search.length > 0
      });
    });

    return _this;
  }

  _createClass(SearchBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var autoFocus = this.props.autoFocus;

      if (autoFocus) {
        this.inputRef.current.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var _this$props = this.props,
          onSearch = _this$props.onSearch,
          throttle = _this$props.throttle;
      var search = this.state.search;

      if (search !== prevState.search) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        if (search) {
          this.timeout = setTimeout(function () {
            (onSearch(search) || Promise.resolve()).then(function () {
              _this2.setState({
                searching: false
              });
            });
          }, throttle);
        } else {
          onSearch(search);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          placeholder = _this$props2.placeholder;
      var _this$state = this.state,
          search = _this$state.search,
          searching = _this$state.searching;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)("chq-sbar", className)
      }, _react.default.createElement(_Icon.default, {
        className: "chq-sbar--gls",
        icon: "ios-search-strong"
      }), _react.default.createElement("input", {
        ref: this.inputRef,
        "aria-label": "Search",
        type: "search",
        name: "search",
        value: search,
        onChange: this.handleChange,
        placeholder: placeholder
      }), searching && _react.default.createElement(_Icon.default, {
        className: "chq-sbar--spn",
        icon: "load-c"
      }));
    }
  }]);

  return SearchBar;
}(_react.Component);

_defineProperty(SearchBar, "defaultProps", {
  autoFocus: false,
  onSearchChange: function onSearchChange() {},
  placeholder: "",
  throttle: 300
});

var _default = SearchBar;
exports.default = _default;