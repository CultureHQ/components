import React from "react";
import { shallow, mount } from "enzyme";

import Icon, { AsyncPath } from "../src/components/Icon";

test("renders without crashing", async () => {
  const component = mount(<AsyncPath icon="checkmark" />);
  expect(component.find("path")).toHaveLength(0);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find("path")).toHaveLength(1);
});

test("passes on extra props", () => {
  const component = shallow(<Icon icon="checkmark" className="icon" />);

  expect(component.hasClass("icon")).toBe(true);
});
