import React from "react";
import { shallow } from "enzyme";

import Thumbnail from "../Thumbnail";

test("renders without crashing", async () => {
  const component = <Thumbnail image="https://robohash.org/1" />;

  expect(shallow(component).html()).toContain("div");
  await expect(component).toHaveNoViolations();
});

test("passes on className", () => {
  const component = shallow(<Thumbnail image="https://robohash.org/1" className="thumbnail" />);

  expect(component.hasClass("thumbnail")).toBe(true);
});
