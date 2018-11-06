"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ROTATIONS = void 0;

var _getRotation = _interopRequireDefault(require("./get-rotation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var getNonRotatedDimensions = function getNonRotatedDimensions(image, maxWidth, maxHeight) {
  var height = Math.min(image.height, maxHeight);
  var width = image.width * (height / image.height);

  if (width > maxWidth) {
    height *= maxWidth / width;
    width = maxWidth;
  }

  return {
    left: "calc(50% - ".concat(width / 2, "px)"),
    height: height,
    width: width
  };
};

var getRotatedDimensions = function getRotatedDimensions(image, maxWidth, maxHeight) {
  var height = Math.min(image.height, maxHeight) * (image.height / image.width);
  var width = image.width * (height / image.height);

  if (height > maxWidth) {
    width *= maxWidth / height;
    height = maxWidth;
  }

  return {
    left: "calc(50% - ".concat(height / 2, "px)"),
    height: height,
    width: width
  };
};

var isMobileSafari = function isMobileSafari(userAgent) {
  return /iP(ad|od|hone)/i.test(userAgent) && /WebKit/i.test(userAgent) && !/(CriOS|FxiOS|OPiOS|mercury)/i.test(userAgent);
}; // In mobile safari EXIF data is read and images are automatically rotated, so
// we should bail out and not attempt to read the EXIF data ourselves.


var getNormalRotation = function getNormalRotation(image) {
  return isMobileSafari(navigator.userAgent) ? Promise.resolve(1) : (0, _getRotation.default)(image);
};

var getImagePromise = function getImagePromise(image) {
  return new Promise(function (onload, onerror) {
    return Object.assign(image, {
      onload: onload,
      onerror: onerror
    });
  });
};

var readImage = function readImage(image, preview, maxWidth, maxHeight) {
  var imageObj = new Image();
  var promises = [getNormalRotation(image), getImagePromise(imageObj)];
  imageObj.src = preview;
  return Promise.all(promises).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        rotation = _ref2[0];

    var dimensions = rotation >= 5 ? getRotatedDimensions(imageObj, maxWidth, maxHeight) : getNonRotatedDimensions(imageObj, maxWidth, maxHeight);
    return {
      src: imageObj.src,
      styles: _objectSpread({}, ROTATIONS[rotation], dimensions)
    };
  });
};

var _default = readImage;
exports.default = _default;