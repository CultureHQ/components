"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ActionButton = _interopRequireDefault(require("./buttons/ActionButton"));

var _Button = _interopRequireDefault(require("./buttons/Button"));

var _Icon = _interopRequireDefault(require("./Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cropperToImage = function cropperToImage(cropper) {
  var type = "image/jpeg";
  var canvas = cropper.getCroppedCanvas({
    fillColor: "#ffffff"
  });
  var binary = window.atob(canvas.toDataURL(type).split(",")[1]);
  var length = binary.length;
  var byteArray = new Uint8Array(length);

  for (var idx = 0; idx < length; idx += 1) {
    byteArray[idx] = binary.charCodeAt(idx);
  }

  return new Blob([byteArray], {
    type: type
  });
};

var ImageEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(ImageEditor, _Component);

  function ImageEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ImageEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ImageEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "imageRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "handleRotateLeft", function () {
      _this.cropper.rotate(-45);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRotateRight", function () {
      _this.cropper.rotate(45);
    });

    _defineProperty(_assertThisInitialized(_this), "handleZoomIn", function () {
      _this.cropper.zoom(0.2);
    });

    _defineProperty(_assertThisInitialized(_this), "handleZoomOut", function () {
      _this.cropper.zoom(-0.2);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSave", function () {
      var onEdit = _this.props.onEdit;
      onEdit(cropperToImage(_this.cropper));
    });

    return _this;
  }

  _createClass(ImageEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.componentIsMounted = true;
      var promises = [import("cropperjs"), import("cropperjs/dist/cropper.css")];
      return Promise.all(promises).then(function (responses) {
        if (_this2.componentIsMounted) {
          var Cropper = responses[0].default;
          var aspectRatio = _this2.props.aspectRatio;
          _this2.cropper = new Cropper(_this2.imageRef.current, {
            aspectRatio: aspectRatio,
            dragMove: "move",
            autoCropArea: 1,
            responsive: true
          });
        }
      }).catch(function () {// this catch is largely here because in the case that you're not in an
        // environment that supports dynamic import (like jest when you're not
        // compiling vendored code) it will spam the console otherwise
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.componentIsMounted = false;

      if (this.cropper) {
        this.cropper.destroy();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          image = _this$props.image,
          onFailure = _this$props.onFailure;
      return _react.default.createElement("div", {
        className: "chq-ied"
      }, _react.default.createElement("div", {
        className: "chq-ied--ctrl"
      }, _react.default.createElement(_ActionButton.default, {
        "aria-label": "Rotate left",
        icon: "arrow-return-left",
        onClick: this.handleRotateLeft
      }), _react.default.createElement(_ActionButton.default, {
        "aria-label": "Rotate right",
        icon: "arrow-return-right",
        onClick: this.handleRotateRight
      }), _react.default.createElement(_ActionButton.default, {
        "aria-label": "Zoom in",
        icon: "ios-plus-outline",
        onClick: this.handleZoomIn
      }), _react.default.createElement(_ActionButton.default, {
        "aria-label": "Zoom out",
        icon: "ios-minus-outline",
        onClick: this.handleZoomOut
      }), _react.default.createElement(_Button.default, {
        primary: true,
        onClick: this.handleSave
      }, _react.default.createElement(_Icon.default, {
        icon: "ios-camera-outline"
      }), " Save")), _react.default.createElement("div", {
        className: "chq-ied--img"
      }, _react.default.createElement("img", {
        ref: this.imageRef,
        src: image,
        alt: "Preview",
        onError: onFailure
      })));
    }
  }]);

  return ImageEditor;
}(_react.Component);

_defineProperty(ImageEditor, "defaultProps", {
  aspectRatio: null
});

var _default = ImageEditor;
exports.default = _default;