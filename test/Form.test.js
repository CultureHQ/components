import React from "react";
import { mount } from "enzyme";

import { Form, StringField } from "../src";

test("passes on className", () => {
  const component = mount(<Form className="form" />);

  expect(component.hasClass("form")).toBe(true);
});

test("does something useful", done => {
  const component = mount(
    <Form>
      <StringField label="Name" name="name" />
    </Form>
  );

  done.fail();
});
