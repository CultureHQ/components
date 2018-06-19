import React from "react";
import { shallow } from "enzyme";

import Warning from "../src/components/Warning";

test("renders without crashing", () => {
  const message = "This is a warning.";
  const component = shallow(<Warning>{message}</Warning>);

  expect(component.html()).toContain(message);
});

test("passes on extra props", () => {
  const component = shallow(<Warning className="warning" />);

  expect(component.hasClass("warning")).toBe(true);
});
