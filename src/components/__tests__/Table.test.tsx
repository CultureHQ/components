import * as React from "react";
import { render } from "@testing-library/react";

import Table from "../Table";

test("has no violations", () => {
  const table = (
    <Table>
      <tbody />
    </Table>
  );

  return expect(table).toHaveNoViolations();
});

test("renders without crashing", () => {
  const { getByRole } = render(<Table>Table!</Table>);

  expect(getByRole("table")).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<Table className="table">Table!</Table>);

  expect(container.querySelector(".table")).toBeTruthy();
});
