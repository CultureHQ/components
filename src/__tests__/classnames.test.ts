import classnames from "../classnames";

test("functions with plain strings", () => {
  const className = classnames("foo", "bar");

  expect(className).toEqual("foo bar");
});

test("ignores falsy values", () => {
  const className = classnames("foo", undefined, null, "bar", false, 0);

  expect(className).toEqual("foo bar");
});

test("ignores numbers", () => {
  const className = classnames(1);

  expect(className).toEqual("");
});

test("treats objects as predicates", () => {
  const className = classnames({
    foo: true,
    bar: false,
    baz: true,
    qux: false
  });

  expect(className).toEqual("foo baz");
});

test("handles mixed objects together", () => {
  const className = classnames(
    "foo",
    { bar: true },
    undefined,
    false,
    null,
    { baz: false },
    "qux"
  );

  expect(className).toEqual("foo bar qux");
});
