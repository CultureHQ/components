import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import Nav from "../Nav";

const setPageYOffset = (value: number) => Object.defineProperty(window, "pageYOffset", { value });

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

test("hides the nav when the page is scrolled down", () => {
  setPageYOffset(25);

  const { container } = render(<Nav>Nav!</Nav>);
  const navElement = container.firstChild as HTMLElement;

  expect(navElement).not.toBe(null);
  expect(navElement.getAttribute("aria-hidden")).toEqual("false");

  setPageYOffset(50);
  fireEvent.scroll(window);

  expect(navElement.getAttribute("aria-hidden")).toEqual("true");
});

test("shows the nav when the page is scrolled up", () => {
  setPageYOffset(100);

  const { container } = render(<Nav>Nav!</Nav>);
  const navElement = container.firstChild as HTMLElement;

  expect(navElement).not.toBe(null);
  expect(navElement.getAttribute("aria-hidden")).toEqual("false");

  setPageYOffset(50);
  fireEvent.scroll(window);

  expect(navElement.getAttribute("aria-hidden")).toEqual("false");
});
