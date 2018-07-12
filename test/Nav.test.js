import React from "react";
import { shallow } from "enzyme";

import Nav from "../src/components/Nav";

test("renders without crashing", () => {
  const message = "This is a nav.";
  const component = shallow(<Nav>{message}</Nav>);

  expect(component.html()).toContain(message);
});
