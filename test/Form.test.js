import React from "react";
import { mount } from "enzyme";

import { Form, EmailField, StringField } from "../src";

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
    <Form onSubmit={onSubmit}>
      <StringField label="Name" name="name" />
      <EmailField label="Email" name="email" />
    </Form>
  );

  component.find("#name").simulate("change", { target: { value: "Kevin" } });
  component.find("#email").simulate("change", {
    target: { value: "kevin@culturehq.com" }
  });
  component.find("button").simulate("click");

  expect(submitted).toEqual({ name: "Kevin", email: "kevin@culturehq.com" });
});

test("disallows submission until all required values are present", () => {
  let submitted = null;
  const onSubmit = values => {
    submitted = values;
    return Promise.resolve();
  };

  const component = mount(
    <Form onSubmit={onSubmit}>
      <StringField label="Name" name="name" />
      <EmailField label="Email" name="email" required />
    </Form>
  );

  component.find("#name").simulate("change", { target: { value: "Kevin" } });
  component.find("button").simulate("click");

  expect(submitted).toBe(null);
  expect(component.state().touched).toBe(true);
});
