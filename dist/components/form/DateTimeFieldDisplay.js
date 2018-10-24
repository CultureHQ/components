"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var padLeft = function padLeft(number) {
  return "0".concat(number).slice(-2);
};

var DateTimeFieldDisplay = function DateTimeFieldDisplay(_ref) {
  var value = _ref.value;

  if (!value) {
    return null;
  }

  var components = [value.getFullYear(), "-", padLeft(value.getMonth() + 1), "-", padLeft(value.getDate()), " ", value.getHours() % 12 || 12, ":", padLeft(value.getMinutes()), " ", value.getHours() < 12 ? "AM" : "PM"];
  return components.join("");
};

var _default = DateTimeFieldDisplay;
exports.default = _default;