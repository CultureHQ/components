"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILEPATH = _path.default.join(__dirname, "image.jpg");

var type = _path.default.extname(FILEPATH).slice(1);

var base64 = _fs.default.readFileSync(FILEPATH).toString("base64");

var _default = "data:image/".concat(type, ";base64,").concat(base64);

exports.default = _default;