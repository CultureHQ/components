"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _CalendarDay = _interopRequireDefault(require("./CalendarDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashMonth = function hashMonth(date) {
  return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1);
};

var hashDate = function hashDate(date) {
  return "".concat(hashMonth(date), "-").concat(date.getDate());
};

var CalendarDays = function CalendarDays(_ref) {
  var value = _ref.value,
      visibleValue = _ref.visibleValue,
      onChange = _ref.onChange;
  var visibleYear = visibleValue.getFullYear();
  var visibleMonth = visibleValue.getMonth();
  var daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();
  var daysInPrevMonth = new Date(visibleYear, visibleMonth, 0).getDate();
  var firstDayOfWeek = new Date(visibleYear, visibleMonth, 1).getDay();
  var lastDayOfWeek = new Date(visibleYear, visibleMonth + 1, 0).getDay();
  var days = [];

  for (var idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
    days.push(new Date(visibleYear, visibleMonth - 1, daysInPrevMonth - idx));
  }

  for (var _idx = 1; _idx <= daysInMonth; _idx += 1) {
    days.push(new Date(visibleYear, visibleMonth, _idx));
  }

  for (var _idx2 = lastDayOfWeek; _idx2 < 6; _idx2 += 1) {
    days.push(new Date(visibleYear, visibleMonth + 1, _idx2 - lastDayOfWeek + 1));
  }

  var valueDateHash = hashDate(value);
  var visibleValueMonthHash = hashMonth(visibleValue);
  return days.map(function (day) {
    var dayDateHash = hashDate(day);
    var className = (0, _classnames.default)("chq-cal--day", {
      "chq-cal--day-act": dayDateHash === valueDateHash,
      "chq-cal--day-out": hashMonth(day) !== visibleValueMonthHash
    });
    return _react.default.createElement(_CalendarDay.default, {
      key: dayDateHash,
      day: day,
      className: className,
      onClick: onChange
    });
  });
};

var _default = CalendarDays;
exports.default = _default;