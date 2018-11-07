"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getHumanSize = function getHumanSize(size) {
  var units = ["bytes", "KB", "MB", "GB"];
  var curSize = size;

  for (var idx = 0; idx < units.length; idx += 1) {
    if (curSize < 1024) {
      return "".concat(Math.round(curSize * 100) / 100, " ").concat(units[idx]);
    }

    curSize /= 1024;
  }

  return "".concat(size, " bytes");
};

var _default = getHumanSize;
exports.default = _default;