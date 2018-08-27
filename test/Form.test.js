import React from "react";
import { mount } from "enzyme";

import {
  Form,
  CentsField,
  EmailField,
  StringField
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
      <StringField label="Name" name="name" />
      <EmailField label="Email" name="email" />
    </Form>
  );

  component.find("#name").simulate("change", { target: { value: "Kevin" } });
  component.simulate("submit");

  expect(submitted).toEqual({ name: "Kevin", email: "kevin@culturehq.com" });
});

test("passes down initialValues", () => {
  const component = mount(
    <Form initialValues={{ cents: 523, name: "Kevin" }}>
      <CentsField label="Cents" name="cents" />
      <StringField label="Name" name="name" />
    </Form>
  );

  expect(component.find("#cents").props().value).toEqual(5.23);
  expect(component.find("#name").props().value).toEqual("Kevin");
});
