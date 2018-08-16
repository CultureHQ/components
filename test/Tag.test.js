import React from "react";
import { shallow } from "enzyme";

import { Tag } from "../src";

test("renders without crashing", () => {
  const message = "Tag.";
  const component = shallow(<Tag>{message}</Tag>);

  expect(component.html()).toContain(message);
});

test("passes on className", () => {
  const component = shallow(<Tag className="tag" />);

  expect(component.hasClass("tag")).toBe(true);
});
