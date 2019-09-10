import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

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
  const { container } = render(<Nav className="nav" />);

  expect(container.firstChild.classList).toContain("nav");
});

test("hides the nav when the page is scrolled down", () => {
  window.pageYOffset = 25;

  const { container } = render(<Nav />);
  expect(container.firstChild.getAttribute("aria-hidden")).toEqual("false");

  window.pageYOffset = 50;
  fireEvent.scroll(window);

  expect(container.firstChild.getAttribute("aria-hidden")).toEqual("true");
});

test("shows the nav when the page is scrolled up", () => {
  window.pageYOffset = 100;

  const { container } = render(<Nav />);
  expect(container.firstChild.getAttribute("aria-hidden")).toEqual("false");

  window.pageYOffset = 50;
  fireEvent.scroll(window);

  expect(container.firstChild.getAttribute("aria-hidden")).toEqual("false");
});
