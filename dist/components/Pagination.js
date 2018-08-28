"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Spacer = function Spacer() {
  return _react.default.createElement("span", {
    className: "chq-pag--sp"
  }, "...");
};

var PageLink =
/*#__PURE__*/
function (_Component) {
  _inherits(PageLink, _Component);

  function PageLink() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PageLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PageLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function () {
      var _this$props = _this.props,
          page = _this$props.page,
          isActive = _this$props.isActive,
          onClick = _this$props.onClick;

      if (!isActive) {
        onClick(page);
      }
    });

    return _this;
  }

  _createClass(PageLink, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          children = _this$props2.children,
          isActive = _this$props2.isActive;
      var className = (0, _classnames.default)("chq-pag--bn", {
        "chq-pag--bn-ac": isActive
      });
      return _react.default.createElement("button", {
        type: "button",
        disabled: disabled,
        className: className,
        onClick: this.handleClick
      }, children);
    }
  }]);

  return PageLink;
}(_react.Component);

var Page = function Page(_ref) {
  var page = _ref.page,
      props = _objectWithoutProperties(_ref, ["page"]);

  return _react.default.createElement(PageLink, _extends({
    page: page
  }, props), page);
};

var PrevPage = function PrevPage(_ref2) {
  var currentPage = _ref2.currentPage,
      onClick = _ref2.onClick;
  return _react.default.createElement(PageLink, {
    disabled: currentPage === 1,
    page: currentPage - 1,
    onClick: onClick
  }, "\xAB");
};

var NextPage = function NextPage(_ref3) {
  var currentPage = _ref3.currentPage,
      totalPages = _ref3.totalPages,
      onClick = _ref3.onClick;
  return _react.default.createElement(PageLink, {
    disabled: currentPage === totalPages,
    page: currentPage + 1,
    onClick: onClick
  }, "\xBB");
};

var Pagination = function Pagination(_ref4) {
  var className = _ref4.className,
      current = _ref4.currentPage,
      total = _ref4.totalPages,
      onClick = _ref4.onClick;

  if (total < 2) {
    return null;
  }

  var innerWindow = _toConsumableArray(Array(5)).map(function (empty, index) {
    return index + current - 2;
  }).filter(function (page) {
    return page >= 1 && page <= total;
  });

  return _react.default.createElement("nav", {
    className: (0, _classnames.default)("chq-pag", className)
  }, _react.default.createElement(PrevPage, {
    currentPage: current,
    onClick: onClick
  }), current > 3 && _react.default.createElement(Page, {
    page: 1,
    onClick: onClick
  }), current > 4 && (current === 5 ? _react.default.createElement(Page, {
    page: 2,
    onClick: onClick
  }) : _react.default.createElement(Spacer, null)), innerWindow.map(function (page) {
    return _react.default.createElement(Page, {
      key: page,
      page: page,
      isActive: page === current,
      onClick: onClick
    });
  }), current < total - 3 && (current === total - 4 ? _react.default.createElement(Page, {
    page: total - 1,
    onClick: onClick
  }) : _react.default.createElement(Spacer, null)), current < total - 2 && _react.default.createElement(Page, {
    page: total,
    onClick: onClick
  }), _react.default.createElement(NextPage, {
    currentPage: current,
    totalPages: total,
    onClick: onClick
  }));
};

var _default = Pagination;
exports.default = _default;