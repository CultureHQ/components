import React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import Icon from "../Icon";
import { close } from "../../icons.json";

test("has no violations", () => (
  expect(<Icon icon="checkmark" />).toHaveNoViolations()
));

test("renders without crashing", async () => {
  const { container, getByRole } = render(<Icon icon="checkmark" />);
  expect(getByRole("presentation").firstChild).toBeFalsy();

  await waitForDomChange({ container });

  expect(getByRole("presentation").firstChild).toBeTruthy();
});

test("passes on className", async () => {
  const { container } = render(<Icon icon="checkmark" className="icon" />);

  expect(container.querySelector(".icon")).toBeTruthy();
});

test("updates the icon when the prop changes", async () => {
  const { container, rerender } = render(<Icon icon="checkmark" />);

  rerender(<Icon icon="close" />);
  await waitForDomChange({ container });

  const path = container.querySelector("path");

  expect(path).not.toBe(null);
  expect((path as SVGElement).getAttribute("d")).toEqual(close.join(" "));
});
