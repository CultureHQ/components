import React from "react";
import { render, waitFor } from "@testing-library/react";

import Icon from "../Icon";
import { close } from "../../icons.json";

// switch back to `getByRole` once
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/38560 closes

test("has no violations", () => (
  expect(<Icon icon="checkmark" />).toHaveNoViolations()
));

test("renders without crashing", async () => {
  const { container } = render(<Icon icon="checkmark" />);
  const svg = container.firstChild as SVGSVGElement;

  expect(svg.firstChild).toBeFalsy();

  await waitFor(() => svg.firstChild);

  expect(svg.firstChild).toBeTruthy();
});

test("passes on className", async () => {
  const { container } = render(<Icon icon="checkmark" className="icon" />);

  expect(container.querySelector(".icon")).toBeTruthy();
});

test("updates the icon when the prop changes", async () => {
  const { container, rerender } = render(<Icon icon="checkmark" />);

  rerender(<Icon icon="close" />);
  await waitFor(() => container.querySelector("path"));

  const path = container.querySelector("path");

  expect(path).not.toBe(null);
  expect((path as SVGElement).getAttribute("d")).toEqual(close.join(" "));
});
