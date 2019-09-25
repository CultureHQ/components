import React from "react";
import { render } from "@testing-library/react";

import Tag from "../Tag";

test("has no violations", () => (
  expect(<Tag>This is a tag</Tag>).toHaveNoViolations()
));

test("renders without crashing", () => {
  const message = "Tag.";
  const { queryByText } = render(<Tag>{message}</Tag>);

  expect(queryByText(message)).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<Tag className="tag">Tag!</Tag>);

  expect(container.querySelector(".tag")).toBeTruthy();
});
