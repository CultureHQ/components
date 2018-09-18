import React from "react";
import { shallow } from "enzyme";

import { PlainButton } from "../src";

test("renders without crashing", () => {
  const message = "This is a button.";
  const component = shallow(<PlainButton>{message}</PlainButton>);

  expect(component.html()).toContain(message);
});

test("passes on className", () => {
  const component = shallow(<PlainButton className="plain-button" />);

  expect(component.hasClass("plain-button")).toBe(true);
  expect(component.hasClass("chq-pbn")).toBe(true);
});
