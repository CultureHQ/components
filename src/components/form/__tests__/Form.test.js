import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Form from "../Form";
import BooleanField from "../BooleanField";
import CentsField from "../CentsField";
import { EmailField, StringField } from "../FormFields";
import TextField from "../TextField";
import SubmitButton from "../SubmitButton";

test("passes on className", () => {
  const { container } = render(<Form className="form" />);

  expect(container.querySelector(".form")).toBeTruthy();
});

test("gathers values as they change and submits them", () => {
  const onSubmit = jest.fn();
  const { getByLabelText, getByRole } = render(
    <Form
      onSubmit={onSubmit}
      initialValues={{ email: "kevin@culturehq.com" }}
    >
      <BooleanField name="boolean">Boolean</BooleanField>
      <StringField name="name">Name</StringField>
      <EmailField name="email">Email</EmailField>
      <TextField name="text">Text</TextField>
      <p>This is a great form!</p>
      {false && <p>This is not going to be displayed</p>}
      <SubmitButton />
    </Form>
  );

  fireEvent.change(getByLabelText("Name"), {
    target: { value: "Kevin" }
  });

  fireEvent.submit(getByRole("form"));

  expect(onSubmit).toHaveBeenCalledWith({
    boolean: false,
    name: "Kevin",
    email: "kevin@culturehq.com"
  });
});

test("allows calling submit manually", () => {
  const formRef = React.createRef();
  const onSubmit = jest.fn();

  render(
    <Form ref={formRef} onSubmit={onSubmit} initialValues={{ email: "kevin@culturehq.com" }}>
      <EmailField name="email">Email</EmailField>
      <SubmitButton />
    </Form>
  );

  formRef.current.submit();

  expect(onSubmit).toHaveBeenCalled();
});

test("does not attempt to setState once the component is unmounted", () => {
  const { getAllByRole, unmount } = render(
    <Form
      onSubmit={() => (
        new Promise(resolve => {
          unmount();
          resolve();
        })
      )}
    >
      <BooleanField name="boolean">Boolean</BooleanField>
      <SubmitButton />
    </Form>
  );

  fireEvent.click(getAllByRole("button")[1]);
});

test("passes down initialValues", () => {
  const { getAllByRole } = render(
    <Form initialValues={{ cents: 523, name: "Kevin" }}>
      <CentsField name="cents">Cents</CentsField>
      <StringField name="name">Name</StringField>
    </Form>
  );

  const [centsInput, nameInput] = getAllByRole("textbox");

  expect(centsInput).toHaveProperty("value", "5.23");
  expect(nameInput).toHaveProperty("value", "Kevin");
});

test("disallows submitting if validation fails", () => {
  const onSubmit = jest.fn(() => Promise.resolve());
  const validator = value => (value === "Pass" ? null : "Fail");

  const { getByRole } = render(
    <Form onSubmit={onSubmit}>
      <StringField name="value" validator={validator}>Value</StringField>
      <SubmitButton />
    </Form>
  );

  fireEvent.click(getByRole("button"));
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.change(getByRole("textbox"), { target: { value: "Pass" } });
  fireEvent.click(getByRole("button"));
  expect(onSubmit.mock.calls[0][0]).toEqual({ value: "Pass" });
});
