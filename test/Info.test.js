import React from "react";
import { shallow } from "enzyme";

import { Info } from "../src";

test("renders without crashing", () => {
  const message = "This is an info.";
  const component = shallow(<Info>{message}</Info>);

  expect(component.html()).toContain(message);
});

test("passes on className", () => {
  const component = shallow(<Info className="info" />);

  expect(component.hasClass("info")).toBe(true);
});
