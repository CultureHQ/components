import React from "react";
import { shallow } from "enzyme";

import Tag from "../Tag";

test("renders without crashing", async () => {
  const message = "Tag.";
  const component = <Tag>{message}</Tag>;

  expect(shallow(component).html()).toContain(message);
  await expect(component).toHaveNoViolations();
});

test("passes on className", () => {
  const component = shallow(<Tag className="tag" />);

  expect(component.hasClass("tag")).toBe(true);
});
