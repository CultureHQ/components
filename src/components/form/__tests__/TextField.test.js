import React from "react";
import { fireEvent, render } from "@testing-library/react";

import TextField from "../TextField";
import Form from "../Form";

test("has no violations", () => (
  expect(<TextField name="text">Text</TextField>).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(
    <TextField name="text" className="text-field" />
  );

  expect(container.querySelector(".text-field")).toBeTruthy();
});

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getByRole } = render(<TextField name="text" onChange={onChange} />);

  fireEvent.change(getByRole("textbox"), { target: { value: "Kevin" } });

  expect(onChange).toHaveBeenCalledWith("Kevin");
});

test("tracks touch status in component state", () => {
  const { container, getByRole, queryByText } = render(
    <TextField name="text" required />
  );

  expect(container.textContent).toEqual("");

  fireEvent.change(getByRole("textbox"), { target: { value: "" } });
  fireEvent.blur(getByRole("textbox"));

  expect(queryByText("Required")).toBeTruthy();
});

test("displays errors if submitted", () => {
  const { container, queryByText, rerender } = render(
    <Form><TextField name="text" required /></Form>
  );

  expect(container.textContent).toEqual("");

  rerender(<Form><TextField name="text" required submitted /></Form>);

  expect(queryByText("Required")).toBeTruthy();
});

test("requests focus when autoFocus is given", () => {
  const { getByRole } = render(<TextField name="text" autoFocus />);

  expect(getByRole("textbox").id).toEqual(document.activeElement.id);
});
