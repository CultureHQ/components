import React from "react";
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

// eslint-disable-next-line jest/valid-describe
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
    const { getByLabelText } = render(
      <Form onSubmit={jest.fn()}>
        <FormField name="name" onChange={onChange}>Field!</FormField>
      </Form>
    );

    fireEvent.change(getByLabelText(/Field!/), { target: { value: "123" } });

    expect(onChange).toHaveBeenCalledWith("123");
  });

  test("tracks touch status in component state", () => {
    const { getByLabelText, queryByText } = render(
      <FormField name="name" required>Field!!</FormField>
    );

    fireEvent.blur(getByLabelText(/Field!/));

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
    const { getByLabelText } = render(
      <FormField name="name" autoFocus>Field!</FormField>
    );

    const inputElement = document.activeElement as HTMLElement;

    expect(inputElement).not.toBe(null);
    expect(getByLabelText(/Field!/).id).toEqual(inputElement.id);
  });

  test("allows other form props", () => {
    const { getByLabelText } = render(
      <FormField name="name" readOnly>Read Only</FormField>
    );

    expect(getByLabelText("Read Only").hasAttribute("readonly")).toBe(true);
  });
});
