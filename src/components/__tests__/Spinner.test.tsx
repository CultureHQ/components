import * as React from "react";
import { render } from "@testing-library/react";

import Spinner from "../Spinner";

test("has no violations", () => (
  expect(<Spinner />).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(<Spinner className="spinner" />);

  expect(container.querySelector(".spinner")).toBeTruthy();
});
