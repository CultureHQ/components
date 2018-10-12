"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Cheer = _interopRequireWildcard(require("./Cheer"));

var _CheerButton = _interopRequireDefault(require("./buttons/CheerButton"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorKeys = Object.keys(_Cheer.COLORS);

var CheerList = function CheerList(_ref) {
  var cheered = _ref.cheered,
      cheers = _ref.cheers,
      name = _ref.name,
      onCheerToggle = _ref.onCheerToggle;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_CheerButton.default, {
    cheered: cheered,
    name: name,
    onCheerToggle: onCheerToggle
  }), cheers.map(function (_ref2, index) {
    var cheerName = _ref2.name;
    return _react.default.createElement(_Cheer.default, {
      key: "".concat(index, "-").concat(name) // eslint-disable-line
      ,
      color: colorKeys[((cheered ? 1 : 0) + index) % colorKeys.length],
      name: cheerName
    });
  }));
};

var _default = CheerList;
exports.default = _default;