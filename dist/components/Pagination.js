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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spacer = function Spacer() {
  return _react2.default.createElement(
    "span",
    { className: "chq-pag--sp" },
    "..."
  );
};

var PageLink = function (_Component) {
  _inherits(PageLink, _Component);

  function PageLink() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PageLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageLink.__proto__ || Object.getPrototypeOf(PageLink)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      var _this$props = _this.props,
          page = _this$props.page,
          isActive = _this$props.isActive,
          onClick = _this$props.onClick;


      if (!isActive) {
        onClick(page);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PageLink, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          children = _props.children,
          isActive = _props.isActive;


      var className = (0, _classnames2.default)("chq-pag--bn", {
        "chq-pag--bn-ac": isActive
      });

      return _react2.default.createElement(
        "button",
        {
          type: "button",
          disabled: disabled,
          className: className,
          onClick: this.handleClick
        },
        children
      );
    }
  }]);

  return PageLink;
}(_react.Component);

var Page = function Page(_ref2) {
  var page = _ref2.page,
      props = _objectWithoutProperties(_ref2, ["page"]);

  return _react2.default.createElement(
    PageLink,
    _extends({ page: page }, props),
    page
  );
};

var PrevPage = function PrevPage(_ref3) {
  var currentPage = _ref3.currentPage,
      onClick = _ref3.onClick;
  return _react2.default.createElement(
    PageLink,
    {
      disabled: currentPage === 1,
      page: currentPage - 1,
      onClick: onClick
    },
    "\xAB"
  );
};

var NextPage = function NextPage(_ref4) {
  var currentPage = _ref4.currentPage,
      totalPages = _ref4.totalPages,
      onClick = _ref4.onClick;
  return _react2.default.createElement(
    PageLink,
    {
      disabled: currentPage === totalPages,
      page: currentPage + 1,
      onClick: onClick
    },
    "\xBB"
  );
};

var Pagination = function Pagination(_ref5) {
  var className = _ref5.className,
      current = _ref5.currentPage,
      total = _ref5.totalPages,
      onClick = _ref5.onClick;

  if (total < 2) {
    return null;
  }

  var innerWindow = [].concat(_toConsumableArray(Array(5))).map(function (empty, index) {
    return index + current - 2;
  }).filter(function (page) {
    return page >= 1 && page <= total;
  });

  return _react2.default.createElement(
    "nav",
    { className: (0, _classnames2.default)("chq-pag", className) },
    _react2.default.createElement(PrevPage, { currentPage: current, onClick: onClick }),
    current > 3 && _react2.default.createElement(Page, { page: 1, onClick: onClick }),
    current > 4 && (current === 5 ? _react2.default.createElement(Page, { page: 2, onClick: onClick }) : _react2.default.createElement(Spacer, null)),
    innerWindow.map(function (page) {
      return _react2.default.createElement(Page, { key: page, page: page, isActive: page === current, onClick: onClick });
    }),
    current < total - 3 && (current === total - 4 ? _react2.default.createElement(Page, { page: total - 1, onClick: onClick }) : _react2.default.createElement(Spacer, null)),
    current < total - 2 && _react2.default.createElement(Page, { page: total, onClick: onClick }),
    _react2.default.createElement(NextPage, { currentPage: current, totalPages: total, onClick: onClick })
  );
};

exports.default = Pagination;