import React from "react";
import { render } from "@testing-library/react";

import Success from "../Success";

test("renders without crashing", () => {
  const message = "This is a success.";
  const { queryByText } = render(<Success>{message}</Success>);

  expect(queryByText(message)).toBeTruthy();
});

test("has no violations", () => (
  expect(<Success>This is a success</Success>).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(<Success className="success">Success!</Success>);

  expect(container.querySelector(".success")).toBeTruthy();
});
