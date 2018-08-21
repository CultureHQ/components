import React, { Component } from "react";
import { mount } from "enzyme";

import { Subnav } from "../src";

class SubnavContainer extends Component {
  state = { activeIndex: 0 };

  handleChange = activeIndex => {
    this.setState({ activeIndex });
  };

  render() {
    const { children } = this.props;
    const { activeIndex } = this.state;

    return (
      <Subnav activeIndex={activeIndex} onChange={this.handleChange}>
        {children}
      </Subnav>
    );
  }
}

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
