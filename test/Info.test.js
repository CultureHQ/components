import React from "react";
import { shallow } from "enzyme";

import Info from "../src/components/Info";

test("renders without crashing", () => {
  const message = "This is an info.";
  const component = shallow(<Info>{message}</Info>);

  expect(component.html()).toContain(message);
});
