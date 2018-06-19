import React from "react";
import { shallow } from "enzyme";

import Success from "../src/components/Success";

test("renders without crashing", () => {
  const message = "This is a success.";
  const component = shallow(<Success>{message}</Success>);

  expect(component.html()).toContain(message);
});

test("passes on extra props", () => {
  const component = shallow(<Success className="success" />);

  expect(component.hasClass("success")).toBe(true);
});
