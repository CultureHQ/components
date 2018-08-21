"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Checkmark = require("./Checkmark");

var _Checkmark2 = _interopRequireDefault(_Checkmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checklist = function Checklist(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return _react2.default.createElement(
    "dl",
    { className: (0, _classnames2.default)("chq-chl", className) },
    children
  );
};

var ChecklistItem = function ChecklistItem(_ref2) {
  var children = _ref2.children,
      checked = _ref2.checked;
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(
      "dt",
      null,
      _react2.default.createElement(_Checkmark2.default, { checked: checked })
    ),
    _react2.default.createElement(
      "dd",
      null,
      children
    )
  );
};

Object.assign(Checklist, {
  Item: ChecklistItem
});

exports.default = Checklist;