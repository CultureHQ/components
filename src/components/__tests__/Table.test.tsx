import React from "react";
import { render } from "@testing-library/react";

import Table from "../Table";

test("has no violations", () => (
  expect(<Table><tbody /></Table>).toHaveNoViolations()
));

test("renders without crashing", () => {
  const { getByRole } = render(<Table><tbody /></Table>);

  expect(getByRole("table")).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<Table className="table"><tbody /></Table>);

  expect(container.querySelector(".table")).toBeTruthy();
});
