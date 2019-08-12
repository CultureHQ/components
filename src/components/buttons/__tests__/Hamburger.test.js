import React, { useState } from "react";
import { act, fireEvent, render } from "@testing-library/react";

import Hamburger from "../Hamburger";

const Container = ({ open: initialOpen }) => {
  const [open, setOpen] = useState(initialOpen);
  const onToggle = () => setOpen(prevOpen => !prevOpen);

  return <Hamburger open={open} onToggle={onToggle} />;
};

test("has no violations", () => (
  expect(<Hamburger />).toHaveNoViolations()
));

test("renders without crashing", () => {
  const { container } = render(<Hamburger />);

  expect(container.querySelector("button")).toBeTruthy();
});

test("passes on extra props", () => {
  const { container } = render(<Hamburger className="ham" />);

  expect(container.querySelector(".ham")).toBeTruthy();
});

test("functions as a controlled component", () => {
  const { container, getByLabelText } = render(<Container />);

  expect(container.querySelector(".chq-ham-op")).toBeFalsy();

  act(() => void fireEvent.click(getByLabelText("Menu Toggle")));

  expect(container.querySelector(".chq-ham-op")).toBeTruthy();
});
