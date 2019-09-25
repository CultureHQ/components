import React from "react";
import { render } from "@testing-library/react";

import Info from "../Info";

test("renders without crashing", () => {
  const message = "This is an info.";
  const { queryByText } = render(<Info>{message}</Info>);

  expect(queryByText(message)).toBeTruthy();
});

test("has no violations", () => (
  expect(<Info>This is an info</Info>).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(<Info className="info">Info!</Info>);

  expect(container.querySelector(".info")).toBeTruthy();
});
