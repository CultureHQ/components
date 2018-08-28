"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Checkmark = _interopRequireDefault(require("./Checkmark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var Checklist = function Checklist(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react.default.createElement("dl", {
    className: (0, _classnames.default)("chq-chl", className)
  }, children);
};

var ChecklistItem = function ChecklistItem(_ref2) {
  var children = _ref2.children,
      checked = _ref2.checked;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("dt", null, _react.default.createElement(_Checkmark.default, {
    checked: checked
  })), _react.default.createElement("dd", null, children));
};

Object.assign(Checklist, {
  Item: ChecklistItem
});
var _default = Checklist;
exports.default = _default;