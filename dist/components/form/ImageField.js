"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _Icon = _interopRequireDefault(require("../Icon"));

var _ModalDialog = _interopRequireDefault(require("../modals/ModalDialog"));

var _ImageEditor = _interopRequireDefault(require("../ImageEditor"));

var _ImagePreview = _interopRequireDefault(require("../ImagePreview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ImageField =
/*#__PURE__*/
function (_Component) {
  _inherits(ImageField, _Component);

  function ImageField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ImageField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ImageField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      editorOpen: false,
      failed: false,
      image: null,
      preview: null
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFileSelected", function (_ref) {
      var _ref$target$files = _slicedToArray(_ref.target.files, 1),
          image = _ref$target$files[0];

      _this.handleImageSelected({
        editorOpen: !!image,
        failed: false,
        image: image || null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleImageEdited", function (image) {
      _this.handleImageSelected({
        editorOpen: false,
        failed: false,
        image: image
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleImageFailure", function () {
      _this.handleImageSelected({
        editorOpen: false,
        failed: true,
        image: null
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleImageSelected", function (_ref2) {
      var editorOpen = _ref2.editorOpen,
          failed = _ref2.failed,
          image = _ref2.image;
      var _this$props = _this.props,
          name = _this$props.name,
          onChange = _this$props.onChange,
          onFormChange = _this$props.onFormChange;

      _this.setState(function (state) {
        URL.revokeObjectURL(state.preview);
        return {
          editorOpen: editorOpen,
          failed: failed,
          image: image,
          preview: image && URL.createObjectURL(image)
        };
      });

      onChange(image);
      onFormChange(name, image);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function () {
      _this.setState({
        editorOpen: false
      });
    });

    return _this;
  }

  _createClass(ImageField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var autoFocus = this.props.autoFocus;

      if (autoFocus) {
        this.inputRef.current.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
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
          failed = _this$state.failed,
          image = _this$state.image,
          preview = _this$state.preview;
      return _react.default.createElement("label", {
        className: (0, _classnames.default)("chq-ffd", className),
        htmlFor: name
      }, _react.default.createElement("span", {
        className: "chq-ffd--lb"
      }, children), _react.default.createElement("div", {
        className: "chq-ffd--im"
      }, _react.default.createElement(_ImagePreview.default, {
        image: image,
        preview: preview || value
      }), !value && _react.default.createElement("div", {
        className: "chq-ffd--im--ph"
      }, _react.default.createElement(_Icon.default, {
        icon: "images"
      })), _react.default.createElement("div", {
        className: "chq-ffd--im--bt"
      }, _react.default.createElement(_Icon.default, {
        icon: "ios-cloud-upload-outline"
      }), " ", "Upload an image"), _react.default.createElement("input", _extends({
        accept: "image/*",
        ref: this.inputRef
      }, props, {
        type: "file",
        id: name,
        name: name,
        onChange: this.handleFileSelected
      })), progress && _react.default.createElement("div", {
        className: "chq-ffd--im--prog"
      }, _react.default.createElement("div", {
        "data-value": progress,
        style: {
          width: "".concat(progress, "%")
        }
      }))), failed && _react.default.createElement("p", {
        className: "chq-ffd--rq"
      }, "Not a valid image."), editorOpen && _react.default.createElement(_ModalDialog.default, {
        onClose: this.handleClose
      }, _react.default.createElement(_ModalDialog.default.Body, null, _react.default.createElement(_ImageEditor.default, {
        aspectRatio: aspectRatio,
        image: preview,
        onEdit: this.handleImageEdited,
        onFailure: this.handleImageFailure
      }))));
    }
  }]);

  return ImageField;
}(_react.Component);

_defineProperty(ImageField, "defaultProps", {
  aspectRatio: null,
  autoFocus: false,
  onChange: function onChange() {},
  onFormChange: function onFormChange() {}
});

var _default = ImageField;
exports.default = _default;