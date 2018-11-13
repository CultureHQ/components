import React from "react";
import { mount } from "enzyme";

import Form from "../Form";
import BooleanField from "../BooleanField";
import CentsField from "../CentsField";
import { EmailField, StringField } from "../FormFields";
import TextField from "../TextField";
import SubmitButton from "../SubmitButton";

const mountFullForm = () => {
  const component = mount(
    <Form
      onSubmit={submitted => { component.submitted = submitted; }}
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

  component.find("#name").simulate("change", { target: { value: "Kevin" } });

  return component;
};

test("passes on className", () => {
  const component = mount(<Form className="form" />);

  expect(component.hasClass("form")).toBe(true);
});

test("gathers values as they change and submits them", () => {
  const component = mountFullForm();
  component.simulate("submit");

  expect(component.submitted).toEqual({
    boolean: false,
    name: "Kevin",
    email: "kevin@culturehq.com"
  });

  component.unmount();
});

test("allows calling submit manually", () => {
  const component = mountFullForm();
  component.instance().submit();

  expect(component.submitted.name).toEqual("Kevin");
});

test("does not attempt to setState once the component is unmounted", () => {
  const component = mount(
    <Form
      onSubmit={() => (
        new Promise(resolve => {
          component.unmount();
          resolve();
        })
      )}
    >
      <BooleanField name="boolean">Boolean</BooleanField>
    </Form>
  );

  component.instance().submit();
});

test("passes down initialValues", () => {
  const component = mount(
    <Form initialValues={{ cents: 523, name: "Kevin" }}>
      <CentsField name="cents">Cents</CentsField>
      <StringField name="name">Name</StringField>
    </Form>
  );

  expect(component.find("#cents").props().value).toEqual(5.23);
  expect(component.find("#name").props().value).toEqual("Kevin");
});

test("disallows submitting if validation fails", () => {
  const onSubmit = jest.fn(() => Promise.resolve());
  const validator = value => (value === "Pass" ? null : "Fail");

  const component = mount(
    <Form onSubmit={onSubmit}>
      <StringField name="value" validator={validator}>Value</StringField>
    </Form>
  );

  component.simulate("submit");
  expect(onSubmit).not.toHaveBeenCalled();

  component.find("#value").simulate("change", { target: { value: "Pass" } });
  component.simulate("submit");
  expect(onSubmit.mock.calls[0][0]).toEqual({ value: "Pass" });
});
