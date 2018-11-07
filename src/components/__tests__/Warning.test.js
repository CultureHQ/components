import React from "react";
import { shallow } from "enzyme";

import Warning from "../Warning";

test("renders without crashing", async () => {
  const message = "This is a warning.";
  const component = <Warning>{message}</Warning>;

  expect(shallow(component).html()).toContain(message);
  await expect(component).toHaveNoViolations();
});

test("passes on className", () => {
  const component = shallow(<Warning className="warning" />);

  expect(component.hasClass("warning")).toBe(true);
});
