import React from "react";
import { render } from "@testing-library/react";

import PlainButton from "../PlainButton";

test("has no violations", () => (
  expect(<PlainButton>This is a button.</PlainButton>).toHaveNoViolations()
));

test("renders without crashing", () => {
  const message = "This is a button.";
  const { queryByText } = render(<PlainButton>{message}</PlainButton>);

  expect(queryByText(message)).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<PlainButton className="plain-button" />);

  expect(container.querySelector(".plain-button")).toBeTruthy();
});

test("passes on disabled and other button props", () => {
  const { container } = render(<PlainButton disabled aria-label="button" />);

  expect(container.querySelector("[disabled]")).toBeTruthy();
  expect(container.querySelector("[aria-label=\"button\"]")).toBeTruthy();
});
