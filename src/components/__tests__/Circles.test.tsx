import React from "react";
import { render } from "@testing-library/react";

import Circles from "../Circles";

test("has no violations", () => (
  expect(<Circles />).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(<Circles className="circles" />);

  expect(container.querySelector(".circles")).toBeTruthy();
});
