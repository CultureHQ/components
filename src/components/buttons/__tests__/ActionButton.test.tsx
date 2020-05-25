import React from "react";
import { render, waitFor } from "@testing-library/react";

import ActionButton from "../ActionButton";
import * as icons from "../../../icons.json";

test("has no violations", () => (
  expect(<ActionButton>This is a button.</ActionButton>).toHaveNoViolations()
));

test("renders without crashing", () => {
  const message = "This is a button.";
  const { queryByText } = render(<ActionButton>{message}</ActionButton>);

  expect(queryByText(message)).toBeTruthy();
});

test("passes on extra props", () => {
  const { container } = render(<ActionButton className="button" />);

  expect(container.querySelector(".button")).toBeTruthy();
});

test("displays a regular icon", async () => {
  const { container } = render(<ActionButton icon="edit">Button</ActionButton>);
  await waitFor(() => container.querySelector("path"));

  const iconPath = container.querySelector("path") as SVGElement;

  expect(iconPath).not.toBe(null);
  expect(iconPath.getAttribute("d")).toEqual(icons.edit.join(" "));
});
