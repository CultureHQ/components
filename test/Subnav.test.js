import React from "react";
import { mount } from "enzyme";

import Subnav from "../src/components/Subnav";

test("renders without crashing", () => {
  const clicks = [];
  const onChange = index => clicks.push(index);

  const component = mount((
    <Subnav onChange={onChange}>
      <Subnav.Item>One</Subnav.Item>
      <Subnav.Item>Two</Subnav.Item>
      <Subnav.Item>Three</Subnav.Item>
    </Subnav>
  ));

  const pattern = [2, 0, 1];
  pattern.forEach(index => {
    component.find(Subnav.Item).at(index).simulate("click");
  });

  expect(clicks).toEqual(pattern);
});
