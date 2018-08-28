import React from "react";
import { mount } from "enzyme";

import { SubmitButton } from "../src";

test("renders without crashing", () => {
  const message = submitting => (submitting ? "Loading..." : "Load");
  const component = mount(<SubmitButton>{message}</SubmitButton>);

  expect(component.text()).toEqual("Load");

  component.setProps({ submitting: true });
  component.update();

  expect(component.text()).toEqual("Loading...");
});

test("uses the default text if children is not provided", () => {
  const component = mount(<SubmitButton />);

  expect(component.text()).toEqual("Submit");

  component.setProps({ submitting: true });
  component.update();

  expect(component.text()).toEqual("Submitting...");
});
