import React from "react";
import { shallow } from "enzyme";

import Button from "../src/components/Button";

test("renders without crashing", () => {
  const message = "This is a button.";
  const component = shallow(<Button>{message}</Button>);

  expect(component.html()).toContain(message);
});

test("passes on extra props", () => {
  const component = shallow(<Button className="button" />);

  expect(component.hasClass("button")).toBe(true);
});
