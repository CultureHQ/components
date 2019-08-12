import React from "react";
import { fireEvent, render } from "@testing-library/react";

import * as FormFields from "../FormFields";
import Form from "../Form";

const CASES = Object.keys(FormFields).map(
  fieldName => [fieldName, FormFields[fieldName]]
);

describe.each(CASES)("%s", (fieldName, FormField) => {
  test("has no violations", () => (
    expect(<FormField name="field">Field</FormField>).toHaveNoViolations()
  ));

  test("passes on className", () => {
    const { container } = render(
      <FormField name="name" className="form-field" />
    );

    expect(container.querySelector(".form-field")).toBeTruthy();
  });

  test("calls up to callbacks if they are provided", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Form>
        <FormField name="name" onChange={onChange} />
      </Form>
    );

    fireEvent.change(getByRole("textbox"), { target: { value: "123" } });

    expect(onChange).toHaveBeenCalledWith("123");
  });

  test("tracks touch status in component state", () => {
    const { container, getByRole, queryByText } = render(
      <FormField name="name" required />
    );

    expect(container.textContent).toEqual("");

    fireEvent.blur(getByRole("textbox"));

    expect(queryByText("Required")).toBeTruthy();
  });

  test("displays errors if submitted", () => {
    const { container, queryByText, rerender } = render(
      <Form><FormField name="name" required /></Form>
    );

    expect(container.textContent).toEqual("");

    rerender(<Form><FormField name="name" required submitted /></Form>);

    expect(queryByText("Required")).toBeTruthy();
  });

  test("requests focus when autoFocus is given", () => {
    const { getByRole } = render(<FormField name="name" autoFocus />);

    expect(getByRole("textbox").id).toEqual(document.activeElement.id);
  });
});
