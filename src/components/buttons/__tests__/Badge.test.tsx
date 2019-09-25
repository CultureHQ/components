import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Badge from "../Badge";

test("has no violations", () => (
  expect(<Badge>This is a badge.</Badge>).toHaveNoViolations()
));

test("renders without crashing", () => {
  const text = "This is a badge.";
  const { queryByText } = render(<Badge>{text}</Badge>);

  expect(queryByText(text)).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<Badge className="badge" />);

  expect(container.querySelector(".badge")).toBeTruthy();
});

test("passes on onClick", () => {
  const onClick = jest.fn();

  const { getByRole } = render(<Badge onClick={onClick} />);
  expect(onClick).not.toHaveBeenCalled();

  fireEvent.click(getByRole("button"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("displays an icon if one is provided", () => {
  const { queryByRole } = render(<Badge icon="clipboard" />);

  expect(queryByRole("presentation", { hidden: true })).toBeTruthy();
});

test("passes along any other props", () => {
  const { container } = render(<Badge data-value="foo" />);

  expect(container.querySelector("[data-value=\"foo\"]")).toBeTruthy();
});
