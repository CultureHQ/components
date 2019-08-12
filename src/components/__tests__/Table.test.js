import React from "react";
import { render } from "@testing-library/react";

import Table from "../Table";

test("has no violations", () => (
  expect(<Table />).toHaveNoViolations()
));

test("renders without crashing", () => {
  const { getByRole } = render(<Table />);

  expect(getByRole("table")).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<Table className="table" />);

  expect(container.querySelector(".table")).toBeTruthy();
});
