import React from "react";
import { mount } from "enzyme";

import { AsyncPath } from "../src/components/Icon";

test("renders without crashing", async () => {
  const component = mount(<AsyncPath icon="checkmark" />);
  expect(component.find("path")).toHaveLength(0);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find("path")).toHaveLength(1);
});
