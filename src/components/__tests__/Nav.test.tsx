import React from "react";
import { render } from "@testing-library/react";

import Nav from "../Nav";

test("has no violations", () => (
  expect(<Nav>This is a nav.</Nav>).toHaveNoViolations()
));

test("renders without crashing", () => {
  const message = "This is a nav.";
  const { queryByText } = render(<Nav>{message}</Nav>);

  expect(queryByText(message)).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<Nav className="nav">Nav!</Nav>);
  const navElement = container.firstChild as HTMLElement;

  expect(navElement).not.toBe(null);
  expect(navElement.classList).toContain("nav");
});
