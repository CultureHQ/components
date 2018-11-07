"use strict";

var _classnames = _interopRequireDefault(require("../classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("functions with plain strings", function () {
  var className = (0, _classnames.default)("foo", "bar");
  expect(className).toEqual("foo bar");
});
test("ignores falsy values", function () {
  var className = (0, _classnames.default)("foo", undefined, null, "bar", false, 0, []);
  expect(className).toEqual("foo bar");
});
test("ignores numbers", function () {
  var className = (0, _classnames.default)(1);
  expect(className).toEqual("");
});
test("treats objects as predicates", function () {
  var className = (0, _classnames.default)({
    foo: true,
    bar: false,
    baz: 1,
    qux: 0
  });
  expect(className).toEqual("foo baz");
});
test("handles mixed objects together", function () {
  var className = (0, _classnames.default)("foo", {
    bar: true
  }, undefined, false, null, {
    baz: 0
  }, "qux");
  expect(className).toEqual("foo bar qux");
});