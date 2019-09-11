import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import TextField from "../TextField";
import Form from "../Form";
import SubmitButton from "../SubmitButton";

test("has no violations", () => (
  expect(<TextField name="text">Text</TextField>).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(
    <TextField name="text" className="text-field">Text!</TextField>
  );

  expect(container.querySelector(".text-field")).toBeTruthy();
});

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <TextField name="text" onChange={onChange}>Text!</TextField>
  );

  fireEvent.change(getByRole("textbox"), { target: { value: "Kevin" } });

  expect(onChange).toHaveBeenCalledWith("Kevin");
});

test("tracks touch status in component state", () => {
  const { container, getByRole, queryByText } = render(
    <TextField name="text" required>Text!</TextField>
  );

  expect(container.textContent).toEqual("");

  fireEvent.change(getByRole("textbox"), { target: { value: "" } });
  fireEvent.blur(getByRole("textbox"));

  expect(queryByText("Required")).toBeTruthy();
});

test("displays errors if submitted", () => {
  const { container, getByRole, queryByText } = render(
    <Form onSubmit={jest.fn()}>
      <TextField name="text" required>Text!</TextField>
      <SubmitButton />
    </Form>
  );

  expect(container.textContent).toEqual("");

  fireEvent.click(getByRole("button"));

  expect(queryByText("Required")).toBeTruthy();
});

test("requests focus when autoFocus is given", () => {
  const { getByRole } = render(
    <TextField name="text" autoFocus>Text!</TextField>
  );

  const inputElement = document.activeElement as HTMLElement;

  expect(inputElement).not.toBe(null);
  expect(getByRole("textbox").id).toEqual(inputElement.id);
});
