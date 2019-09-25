import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import Hamburger from "../Hamburger";

const Container: React.FC<{ open?: boolean }> = ({ open: initialOpen = false }) => {
  const [open, setOpen] = React.useState(initialOpen);
  const onToggle = () => setOpen(prevOpen => !prevOpen);

  return <Hamburger open={open} onToggle={onToggle} />;
};

test("has no violations", () => (
  expect(<Hamburger onToggle={jest.fn()} />).toHaveNoViolations()
));

test("renders without crashing", () => {
  const { container } = render(<Hamburger onToggle={jest.fn()} />);

  expect(container.querySelector("button")).toBeTruthy();
});

test("passes on extra props", () => {
  const { container } = render(<Hamburger className="ham" onToggle={jest.fn()} />);

  expect(container.querySelector(".ham")).toBeTruthy();
});

test("functions as a controlled component", () => {
  const { container, getByLabelText } = render(<Container />);

  expect(container.querySelector(".chq-ham-op")).toBeFalsy();

  fireEvent.click(getByLabelText("Menu Toggle"));

  expect(container.querySelector(".chq-ham-op")).toBeTruthy();
});
