import React from "react";
import { render } from "@testing-library/react";

import Thumbnail from "../Thumbnail";

test("renders without crashing", () => (
  expect(<Thumbnail image="https://robohash.org/1" />).toHaveNoViolations()
));

test("allows you to use a different component", () => {
  const { container } = render(
    <Thumbnail image="https://robohash.org/1" as="span" />
  );

  expect(container.querySelector("span")).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(
    <Thumbnail image="https://robohash.org/1" className="thumbnail" />
  );

  expect(container.querySelector(".thumbnail")).toBeTruthy();
});
