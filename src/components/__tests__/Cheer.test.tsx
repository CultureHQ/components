import * as React from "react";
import { render } from "@testing-library/react";

import Cheer from "../Cheer";

test("has no violations", () => (
  expect(<Cheer />).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(<Cheer className="cheer" />);

  expect(container.querySelector(".cheer")).toBeTruthy();
});

test("allows you to pass different colors", () => {
  const { container } = render(<Cheer color="yellow" />);

  expect(container.querySelector(".chq-chr-yw")).toBeTruthy();
});

test("renders a tooltip if you pass a name", () => {
  const { container } = render(<Cheer name="Harry" />);

  expect(container.querySelectorAll(".chq-ttp")).toHaveLength(1);
});

test("adds the animation class if the pop prop is passed", () => {
  const { container } = render(<Cheer pop />);

  expect(container.querySelector(".chq-chr-pp")).toBeTruthy();
});
