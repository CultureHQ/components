"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("../../classnames"));

var _CalendarDay = _interopRequireDefault(require("./CalendarDay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getPrevMonthFillDays = function getPrevMonthFillDays(visibleValue) {
  var visibleYear = visibleValue.getUTCFullYear();
  var visibleMonth = visibleValue.getUTCMonth();
  var daysInPrevMonth = new Date(visibleYear, visibleMonth, 0).getUTCDate();
  var firstDayOfWeek = new Date(visibleYear, visibleMonth, 1).getUTCDay();
  var days = [];
  var prevYear = visibleYear - (visibleMonth === 0 ? 1 : 0);
  var prevMonth = (visibleMonth - 1 + 12) % 12;

  for (var idx = firstDayOfWeek - 1; idx >= 0; idx -= 1) {
    days.push({
      year: prevYear,
      month: prevMonth,
      day: daysInPrevMonth - idx
    });
  }

  return days;
};

var getCurrentMonthDays = function getCurrentMonthDays(value) {
  var year = value.getUTCFullYear();
  var month = value.getUTCMonth();
  var maxDay = new Date(year, month + 1, 0).getUTCDate();
  var days = [];

  for (var day = 1; day <= maxDay; day += 1) {
    days.push({
      year: year,
      month: month,
      day: day
    });
  }

  return days;
};

var getNextMonthFillDays = function getNextMonthFillDays(visibleValue) {
  var visibleYear = visibleValue.getUTCFullYear();
  var visibleMonth = visibleValue.getUTCMonth();
  var lastDayOfWeek = new Date(visibleYear, visibleMonth + 1, 0).getUTCDay();
  var days = [];
  var nextYear = visibleYear + (visibleMonth === 11 ? 1 : 0);
  var nextMonth = (visibleMonth + 1) % 12;

  for (var idx = lastDayOfWeek; idx < 6; idx += 1) {
    days.push({
      year: nextYear,
      month: nextMonth,
      day: idx - lastDayOfWeek + 1
    });
  }

  return days;
};

var CalendarDays = function CalendarDays(_ref) {
  var value = _ref.value,
      visibleValue = _ref.visibleValue,
      onChange = _ref.onChange;
  var valueHash = "".concat(value.getUTCFullYear(), "-").concat(value.getUTCMonth(), "-").concat(value.getUTCDate());
  var visibleMonth = visibleValue.getUTCMonth();

  var days = _toConsumableArray(getPrevMonthFillDays(visibleValue)).concat(_toConsumableArray(getCurrentMonthDays(visibleValue)), _toConsumableArray(getNextMonthFillDays(visibleValue)));

  return days.map(function (_ref2) {
    var year = _ref2.year,
        month = _ref2.month,
        day = _ref2.day;
    var dayDateHash = "".concat(year, "-").concat(month, "-").concat(day);
    var className = (0, _classnames.default)("chq-cal--day", {
      "chq-cal--day-act": dayDateHash === valueHash,
      "chq-cal--day-out": month !== visibleMonth
    });
    return _react.default.createElement(_CalendarDay.default, {
      key: dayDateHash,
      year: year,
      month: month,
      day: day,
      className: className,
      onClick: onChange
    });
  });
};

var _default = CalendarDays;
exports.default = _default;