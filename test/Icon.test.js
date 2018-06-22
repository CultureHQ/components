import React from "react";
import { shallow } from "enzyme";

import Icon from "../src/components/Icon";

test("renders without crashing", async () => {
  const component = shallow(<Icon icon="checkmark" />);

  expect(component.find("path")).toHaveLength(1);
});

test("passes on extra props", () => {
  const component = shallow(<Icon icon="checkmark" className="icon" />);

  expect(component.hasClass("icon")).toBe(true);
});
