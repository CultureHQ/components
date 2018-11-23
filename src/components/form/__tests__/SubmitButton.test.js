import React from "react";
import { mount } from "enzyme";

import SubmitButton from "../SubmitButton";
import Form from "../Form";

test("renders without crashing", () => {
  const message = submitting => (submitting ? "Loading..." : "Load");
  const component = mount(<Form><SubmitButton>{message}</SubmitButton></Form>);

  expect(component.text()).toEqual("Load");

  component.setState({ submitting: true });
  component.update();

  expect(component.text()).toEqual("Loading...");
});

test("uses the default text if children is not provided", () => {
  const component = mount(<Form><SubmitButton /></Form>);

  expect(component.text()).toEqual("Submit");

  component.setState({ submitting: true });
  component.update();

  expect(component.text()).toEqual("Submitting...");
});
