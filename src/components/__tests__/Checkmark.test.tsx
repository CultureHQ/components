import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Checkmark from "../Checkmark";

test("has no violations", () => (
  expect(<Checkmark />).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(<Checkmark className="checkmark" />);

  expect(container.querySelector(".checkmark")).toBeTruthy();
});

test("passes on onClick", () => {
  const onClick = jest.fn();

  const { getByRole } = render(<Checkmark checked onClick={onClick} />);
  expect(onClick).not.toHaveBeenCalled();

  fireEvent.click(getByRole("button"));
  expect(onClick).toHaveBeenLastCalledWith(false);
});

test("passes on disabled", () => {
  const onClick = jest.fn();

  const { getByRole } = render(<Checkmark disabled onClick={onClick} />);

  fireEvent.click(getByRole("button"));
  expect(onClick).not.toHaveBeenCalled();
});

test("allows auto focus", () => {
  const { getByRole } = render(<Checkmark autoFocus />);

  expect(document.activeElement).toEqual(getByRole("button"));
});
