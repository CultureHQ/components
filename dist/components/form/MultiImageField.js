"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Transport = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _ImageEditor = _interopRequireDefault(require("../ImageEditor"));

var _ImagePreview = _interopRequireDefault(require("../ImagePreview"));

var _Table = _interopRequireDefault(require("../Table"));

var _ActionButton = _interopRequireDefault(require("../buttons/ActionButton"));

var _ModalDialog = _interopRequireDefault(require("../modals/ModalDialog"));

var _getHumanSize = _interopRequireDefault(require("../../utils/get-human-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hashTransports = function hashTransports(transports) {
  return transports.map(function (_ref) {
    var key = _ref.key;
    return key;
  }).join(",");
};

var Transport =
/*#__PURE__*/
function () {
  function Transport(file) {
    _classCallCheck(this, Transport);

    this.file = file;
    this.name = file.name;
    this.key = "".concat(file.name, "-").concat(+new Date());
    this.preview = URL.createObjectURL(file);
  }

  _createClass(Transport, [{
    key: "mutate",
    value: function mutate(file) {
      var transport = new Transport(file);
      transport.name = this.name;
      return transport;
    }
  }, {
    key: "size",
    get: function get() {
      return (0, _getHumanSize.default)(this.file.size);
    }
  }]);

  return Transport;
}();

exports.Transport = Transport;

var Preview = function Preview(_ref2) {
  var transport = _ref2.transport,
      onEdit = _ref2.onEdit,
      onRemove = _ref2.onRemove;
  return _react.default.createElement("tr", null, _react.default.createElement("td", null, _react.default.createElement(_ImagePreview.default, {
    image: transport.file,
    preview: transport.preview
  })), _react.default.createElement("td", null, transport.name), _react.default.createElement("td", null, transport.size), _react.default.createElement("td", null, _react.default.createElement("div", null, _react.default.createElement(_ActionButton.default, {
    icon: "edit",
    onClick: function onClick() {
      return onEdit(transport.key);
    }
  }, "Edit"), " ", _react.default.createElement(_ActionButton.default, {
    icon: "trash-a",
    onClick: function onClick() {
      return onRemove(transport.key);
    }
  }, "Remove"))));
};

var MultiImageField =
/*#__PURE__*/
function (_Component) {
  _inherits(MultiImageField, _Component);

  function MultiImageField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MultiImageField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MultiImageField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      currentTransport: null,
      editorOpen: false,
      transports: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFilesSelected", function (_ref3) {
      var files = _ref3.target.files;

      _this.setState(function (_ref4) {
        var transports = _ref4.transports;
        return {
          editorOpen: false,
          currentTransport: null,
          transports: _toConsumableArray(transports).concat(_toConsumableArray(Array.from(files).map(function (file) {
            return new Transport(file);
          })))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleImageRemove", function (transportKey) {
      _this.setState(function (_ref5) {
        var transports = _ref5.transports;
        return {
          transports: transports.filter(function (transport) {
            return transport.key !== transportKey;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleImageEdit", function (transportKey) {
      _this.setState(function (_ref6) {
        var transports = _ref6.transports;
        return {
          editorOpen: true,
          currentTransport: transports.find(function (transport) {
            return transport.key === transportKey;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleImageEdited", function (image) {
      _this.setState(function (_ref7) {
        var currentTransport = _ref7.currentTransport,
            transports = _ref7.transports;
        return {
          editorOpen: false,
          currentTransport: null,
          transports: transports.map(function (transport) {
            return transport.key === currentTransport.key ? transport.mutate(image) : transport;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleImageFailure", function () {
      _this.setState(function (_ref8) {
        var currentTransport = _ref8.currentTransport,
            transports = _ref8.transports;
        return {
          editorOpen: false,
          currentTransport: null,
          transports: transports.filter(function (transport) {
            return transport.key !== currentTransport.key;
          })
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        editorOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClick", function () {
      _this.inputRef.current.value = null;
    });

    return _this;
  }

  _createClass(MultiImageField, [{
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
      var _this$props = this.props,
          name = _this$props.name,
          onChange = _this$props.onChange,
          onFormChange = _this$props.onFormChange;
      var nextTransports = this.state.transports;

      if (hashTransports(nextTransports) !== hashTransports(prevState.transports)) {
        var files = nextTransports.map(function (_ref9) {
          var file = _ref9.file;
          return file;
        });
        onChange(files);
        onFormChange(name, files);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          aspectRatio = _this$props2.aspectRatio,
          autoFocus = _this$props2.autoFocus,
          children = _this$props2.children,
          className = _this$props2.className,
          name = _this$props2.name,
          onChange = _this$props2.onChange,
          onFormChange = _this$props2.onFormChange,
          onError = _this$props2.onError,
          progress = _this$props2.progress,
          submitted = _this$props2.submitted,
          value = _this$props2.value,
          props = _objectWithoutProperties(_this$props2, ["aspectRatio", "autoFocus", "children", "className", "name", "onChange", "onFormChange", "onError", "progress", "submitted", "value"]);

      var _this$state = this.state,
          editorOpen = _this$state.editorOpen,
          currentTransport = _this$state.currentTransport,
          transports = _this$state.transports;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("label", {
        className: (0, _classnames.default)("chq-ffd", className),
        htmlFor: name
      }, _react.default.createElement("span", {
        className: "chq-ffd--lb"
      }, children), _react.default.createElement("div", {
        className: "chq-ffd--im"
      }, _react.default.createElement("div", {
        className: "chq-ffd--im--ph"
      }, _react.default.createElement(_Icon.default, {
        icon: "images"
      })), _react.default.createElement("div", {
        className: "chq-ffd--im--bt"
      }, _react.default.createElement(_Icon.default, {
        icon: "ios-cloud-upload-outline"
      }), " ", "Upload images"), _react.default.createElement("input", _extends({
        ref: this.inputRef,
        accept: "image/*",
        multiple: true,
        type: "file",
        onClick: this.handleClick,
        onChange: this.handleFilesSelected
      }, props, {
        id: name,
        name: name
      })))), transports.length > 0 && _react.default.createElement(_Table.default, {
        className: "chq-mif"
      }, _react.default.createElement("tbody", null, transports.map(function (transport) {
        return _react.default.createElement(Preview, {
          key: transport.key,
          transport: transport,
          onEdit: _this2.handleImageEdit,
          onRemove: _this2.handleImageRemove
        });
      }))), editorOpen && currentTransport && _react.default.createElement(_ModalDialog.default, {
        onClose: this.handleClose
      }, _react.default.createElement(_ModalDialog.default.Body, null, _react.default.createElement(_ImageEditor.default, {
        aspectRatio: aspectRatio,
        image: currentTransport.preview,
        onEdit: this.handleImageEdited,
        onFailure: this.handleImageFailure
      }))));
    }
  }]);

  return MultiImageField;
}(_react.Component);

_defineProperty(MultiImageField, "defaultProps", {
  aspectRatio: null,
  autoFocus: false,
  onChange: function onChange() {},
  onFormChange: function onFormChange() {}
});

var _default = MultiImageField;
exports.default = _default;