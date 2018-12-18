"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getRotation = function getRotation(file) {
  return new Promise(function (resolve, reject) {
    if (!(file instanceof File)) {
      resolve(1);
      return;
    }

    var reader = new FileReader();
    reader.onerror = reject;

    reader.onloadend = function () {
      var scanner = new DataView(reader.result);
      var idx = 0;
      var rotation = 1;

      if (reader.result.length < 2 || scanner.getUint16(idx) !== 0xFFD8) {
        return resolve(1);
      }

      idx += 2;
      var maxBytes = scanner.byteLength;

      while (idx < maxBytes - 2) {
        var uint16 = scanner.getUint16(idx);
        idx += 2;

        switch (uint16) {
          case 0xFFE1:
            // Start of EXIF
            maxBytes = scanner.getUint16(idx) - idx;
            idx += 2;
            break;

          case 0x0112:
            // Orientation tag
            rotation = scanner.getUint16(idx + 6);
            maxBytes = 0;
            break;

          default:
            break;
        }
      }

      return resolve(rotation);
    };

    reader.readAsArrayBuffer(file);
  });
};

var _default = getRotation;
exports.default = _default;