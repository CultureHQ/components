import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import { EmailField, NumberField, PasswordField, StringField } from "../FormFields";
import Form from "../Form";
import SubmitButton from "../SubmitButton";

const cases = [
  ["email", EmailField],
  ["number", NumberField],
  ["password", PasswordField],
  ["string", StringField]
];

describe.each(cases)("%s", (type, FormField) => {
  test("has no violations", () => (
    expect(<FormField name="field">Field!</FormField>).toHaveNoViolations()
  ));

  test("passes on className", () => {
    const { container } = render(
      <FormField name="name" className="form-field">Field!</FormField>
    );

    expect(container.querySelector(".form-field")).toBeTruthy();
  });

  test("calls up to callbacks if they are provided", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Form onSubmit={jest.fn()}>
        <FormField name="name" onChange={onChange}>Field!</FormField>
      </Form>
    );

    fireEvent.change(getByRole("textbox"), { target: { value: "123" } });

    expect(onChange).toHaveBeenCalledWith("123");
  });

  test("tracks touch status in component state", () => {
    const { container, getByRole, queryByText } = render(
      <FormField name="name" required><span /></FormField>
    );

    expect(container.textContent).toEqual("");

    fireEvent.blur(getByRole("textbox"));

    expect(queryByText("Required")).toBeTruthy();
  });

  test("displays errors if submitted", () => {
    const { container, getByRole, queryByText } = render(
      <Form onSubmit={jest.fn()}>
        <FormField name="name" required><span /></FormField>
        <SubmitButton />
      </Form>
    );

    expect(container.textContent).toEqual("Submit");

    fireEvent.click(getByRole("button"));

    expect(queryByText("Required")).toBeTruthy();
  });

  test("requests focus when autoFocus is given", () => {
    const { getByRole } = render(
      <FormField name="name" autoFocus>Field!</FormField>
    );

    const inputElement = document.activeElement as HTMLElement;

    expect(inputElement).not.toBe(null);
    expect(getByRole("textbox").id).toEqual(inputElement.id);
  });
});
