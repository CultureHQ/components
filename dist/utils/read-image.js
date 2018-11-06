"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ROTATIONS = void 0;

var _getRotation = _interopRequireDefault(require("./get-rotation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ROTATIONS = [{}, {}, {
  transform: "rotateY(180deg)"
}, {
  transform: "rotate(180deg)"
}, {
  transform: "rotate(180deg) rotateY(180deg)"
}, {
  transform: "rotate(270deg) rotateY(180deg)",
  transformOrigin: "top left"
}, {
  transform: "translateY(-100%) rotate(90deg)",
  transformOrigin: "bottom left"
}, {
  transform: "translateY(-100%) translateX(-100%) rotate(90deg) rotateY(180deg)",
  transformOrigin: "bottom right"
}, {
  transform: "translateX(-100%) rotate(270deg)",
  transformOrigin: "top right"
}];
exports.ROTATIONS = ROTATIONS;

var getRotationStyles = function getRotationStyles(image, rotation, maxHeight) {
  var scaledWidth = image.width / image.height * maxHeight;
  var scaledHeight = image.height / image.width * maxHeight;
  var halfWidth = (rotation >= 5 ? scaledHeight : scaledWidth) / 2;
  return _objectSpread({}, ROTATIONS[rotation], {
    left: "calc(50% - ".concat(halfWidth, "px)"),
    height: rotation >= 5 ? scaledHeight : maxHeight
  });
};

var getImagePromise = function getImagePromise(image) {
  return new Promise(function (onload, onerror) {
    return Object.assign(image, {
      onload: onload,
      onerror: onerror
    });
  });
};

var readImage = function readImage(image, preview, maxHeight) {
  var imageObj = new Image();
  var promises = [(0, _getRotation.default)(image), getImagePromise(imageObj)];
  imageObj.src = preview;
  return Promise.all(promises).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        rotation = _ref2[0];

    return {
      src: imageObj.src,
      styles: getRotationStyles(imageObj, rotation, maxHeight)
    };
  });
};

var _default = readImage;
exports.default = _default;