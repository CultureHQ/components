import React, { useState } from "react";
import { mount } from "enzyme";

import Subnav from "../Subnav";

const SubnavContainer = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Subnav activeIndex={activeIndex} onChange={setActiveIndex}>
      {children}
    </Subnav>
  );
};

test("renders without crashing", async () => {
  const clicks = [];
  const onChange = index => clicks.push(index);

  const component = (
    <Subnav onChange={onChange}>
      <Subnav.Item>One</Subnav.Item>
      <Subnav.Item>Two</Subnav.Item>
      <Subnav.Item>Three</Subnav.Item>
    </Subnav>
  );

  const mounted = mount(component);
  const pattern = [2, 0, 1];

  pattern.forEach(index => {
    mounted.find(Subnav.Item).at(index).simulate("click");
  });

  expect(clicks).toEqual(pattern);
  await expect(component).toHaveNoViolations();
});

test("additionally functions as a controlled component", () => {
  const component = mount(
    <SubnavContainer>
      <Subnav.Item>One</Subnav.Item>
      <Subnav.Item>Two</Subnav.Item>
      <Subnav.Item>Three</Subnav.Item>
    </SubnavContainer>
  );

  component.find(Subnav.Item).at(1).simulate("click");
  expect(component.find(Subnav).props().activeIndex).toEqual(1);
  expect(component.find(Subnav.Item).at(1).props().active).toBe(true);
});
