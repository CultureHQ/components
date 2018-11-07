"use strict";

var _getHumanSize = _interopRequireDefault(require("../get-human-size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIZES = [[512, "512 bytes"], [524288, "512 KB"], [536870912, "512 MB"], [549755813888, "512 GB"], [562949953421312, "562949953421312 bytes"]];
test.each(SIZES)("sizes shrink appropriately at %i", function (size, expected) {
  expect((0, _getHumanSize.default)(size)).toEqual(expected);
});