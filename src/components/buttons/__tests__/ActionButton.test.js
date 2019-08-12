import React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import ActionButton from "../ActionButton";
import icons from "../../../icons.json";

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
  await waitForDomChange({ container });

  const iconPath = container.querySelector("path").getAttribute("d");
  expect(iconPath).toEqual(icons.edit.join(" "));
});
