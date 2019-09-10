import * as React from "react";
import { render } from "@testing-library/react";

import Warning from "../Warning";

test("renders without crashing", () => {
  const message = "This is a warning.";
  const { queryByText } = render(<Warning>{message}</Warning>);

  expect(queryByText(message)).toBeTruthy();
});

test("has no violations", () => (
  expect(<Warning>This is a warning.</Warning>).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(<Warning className="warning">Warning!</Warning>);

  expect(container.querySelector(".warning")).toBeTruthy();
});
