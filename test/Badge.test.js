import React from "react";
import { shallow } from "enzyme";

import Badge from "../src/components/Badge";

test("renders without crashing", () => {
  const message = "This is a badge.";
  const component = shallow(<Badge>{message}</Badge>);

  expect(component.html()).toContain(message);
});
