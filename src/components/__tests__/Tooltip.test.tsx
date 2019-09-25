import React from "react";
import { render } from "@testing-library/react";

import Tooltip from "../Tooltip";

let requestAnimationFrame: ReturnType<typeof jest.spyOn>;

beforeEach(() => {
  requestAnimationFrame = jest.spyOn(window, "requestAnimationFrame");
});

afterEach(() => {
  requestAnimationFrame.mockRestore();
});

test("has no violations", () => (
  expect(<Tooltip tip="Tip">Tooltip!</Tooltip>).toHaveNoViolations()
));

test("resizes when the window resizes and dedups resize events", done => {
  const { unmount } = render(<Tooltip tip="Tip">Tooltip!</Tooltip>);

  Object.defineProperty(window, "innerWidth", { value: 200 });
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("resize"));

  setTimeout(() => {
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
    unmount();
    done();
  }, 1000);
});

test("recomputes offsets when the tip changes", () => {
  const { rerender } = render(<Tooltip tip="Tip">Tooltip!</Tooltip>);
  expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

  rerender(<Tooltip tip="Tip">Tooltip!</Tooltip>);
  expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

  rerender(<Tooltip tip="A different tip">Tooltip!</Tooltip>);
  expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
});
