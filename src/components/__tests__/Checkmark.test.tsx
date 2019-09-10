import * as React from "react";
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
