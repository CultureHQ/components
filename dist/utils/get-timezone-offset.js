"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getTimezoneOffset = function getTimezoneOffset(name) {
  return import("../timezones.json").then(function (module) {
    var match = module.default.find(function (timezone) {
      return name === timezone.value;
    });

    if (!match) {
      throw new Error("Could not find timezone named ".concat(name));
    }

    return match.offset;
  });
};

var _default = getTimezoneOffset;
exports.default = _default;