import React from "react";
import { mount } from "enzyme";

import {
  Form,
  CentsField,
  EmailField,
  StringField,
  SubmitButton
} from "../src";

test("passes on className", () => {
  const component = mount(<Form className="form" />);

  expect(component.hasClass("form")).toBe(true);
});

test("gathers values as they change and submits them", () => {
  let submitted = null;
  const onSubmit = values => {
    submitted = values;
    return Promise.resolve();
  };

  const component = mount(
    <Form onSubmit={onSubmit} initialValues={{ email: "kevin@culturehq.com" }}>
      <StringField name="name">Name</StringField>
      <EmailField name="email">Email</EmailField>
      <p>This is a great form!</p>
      <SubmitButton />
    </Form>
  );

  component.find("#name").simulate("change", { target: { value: "Kevin" } });
  component.simulate("submit");

  expect(submitted).toEqual({ name: "Kevin", email: "kevin@culturehq.com" });
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
  let submitted = null;
  const onSubmit = values => {
    submitted = values;
    return Promise.resolve();
  };

  const validator = value => (value === "Pass" ? null : "Fail");

  const component = mount(
    <Form onSubmit={onSubmit}>
      <StringField name="value" validator={validator}>Value</StringField>
    </Form>
  );

  component.simulate("submit");
  expect(submitted).toBe(null);

  component.find("#value").simulate("change", { target: { value: "Pass" } });
  component.simulate("submit");
  expect(submitted).toEqual({ value: "Pass" });
});
