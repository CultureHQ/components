import React from "react";
import { shallow } from "enzyme";

import Success from "../Success";

test("renders without crashing", async () => {
  const message = "This is a success.";
  const component = <Success>{message}</Success>;

  expect(shallow(component).html()).toContain(message);
  await expect(component).toHaveNoViolations();
});

test("passes on className", () => {
  const component = shallow(<Success className="success" />);

  expect(component.hasClass("success")).toBe(true);
});
