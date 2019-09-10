import * as React from "react";
import { render } from "@testing-library/react";

import Tooltip from "../Tooltip";

beforeEach(() => {
  window.requestAnimationFrame = jest.fn();
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

test("has no violations", () => (
  expect(<Tooltip tip="Tip">Inner content</Tooltip>).toHaveNoViolations()
));

test("resizes when the window resizes and dedups resize events", done => {
  const { unmount } = render(<Tooltip tip="Tip" />);

  window.innerWidth = 200;
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("resize"));
  window.dispatchEvent(new Event("resize"));

  setTimeout(() => {
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);
    unmount();
    done();
  }, 1000);
});

test("recomputes offsets when the tip changes", () => {
  const { rerender } = render(<Tooltip tip="Tip">Body</Tooltip>);
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);

  rerender(<Tooltip tip="Tip">Body</Tooltip>);
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);

  rerender(<Tooltip tip="A different tip">Body</Tooltip>);
  expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2);
});
