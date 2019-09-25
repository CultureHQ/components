import React from "react";
import { fireEvent, render } from "@testing-library/react";

import CentsField from "../CentsField";

test("has no violations", () => (
  expect(<CentsField name="cents">Cents</CentsField>).toHaveNoViolations()
));

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <CentsField name="cents" onChange={onChange}>
      Cents!
    </CentsField>
  );

  fireEvent.change(getByRole("textbox"), { target: { value: 1.23 } });

  expect(onChange).toHaveBeenCalledWith(123);
});

test("displays the value using cents", () => {
  const { getByRole } = render(
    <CentsField name="cents" value={123}>
      Cents!
    </CentsField>
  );

  expect(getByRole("textbox")).toHaveProperty("value", "1.23");
});

test("validates that the value cannot be <= 0", () => {
  const onError = jest.fn();
  render(
    <CentsField name="cents" value={-5} onError={onError}>
      Cents!
    </CentsField>
  );

  expect(onError).toHaveBeenCalledTimes(1);
});

test("handles cases where the value is empty", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <CentsField name="cents" onChange={onChange} value={123}>
      Cents!
    </CentsField>
  );

  fireEvent.change(getByRole("textbox"), { target: { value: "" } });

  expect(onChange).toHaveBeenLastCalledWith(null);
});

test("functions without an onChange", () => {
  const { getByRole } = render(<CentsField name="cents">Cents!</CentsField>);

  fireEvent.change(getByRole("textbox"), { target: { value: "" } });
});

test("tracks touch status in component state", () => {
  const { getByRole, queryByText } = render(
    <CentsField name="cents" required>
      Cents!
    </CentsField>
  );

  expect(queryByText("Required")).toBeFalsy();

  fireEvent.blur(getByRole("textbox"));

  expect(queryByText("Required")).toBeTruthy();
});

test("requests focus when autoFocus is given", () => {
  const { getByRole } = render(
    <CentsField name="cents" autoFocus>
      Cents!
    </CentsField>
  );

  const inputElement = document.activeElement as HTMLElement;

  expect(inputElement).not.toBe(null);
  expect(getByRole("textbox").id).toEqual(inputElement.id);
});
