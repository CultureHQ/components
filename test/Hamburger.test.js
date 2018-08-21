import React, { Component } from "react";
import { shallow, mount } from "enzyme";

import { Hamburger } from "../src";

class HamburgerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { open: props.open };
  }

  handleToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    const { open } = this.state;

    return <Hamburger open={open} onToggle={this.handleToggle} />;
  }
}

test("renders without crashing", () => {
  const component = shallow(<Hamburger />);

  expect(component.type()).toEqual("button");
});

test("passes on extra props", () => {
  const component = shallow(<Hamburger className="ham" />);

  expect(component.hasClass("ham")).toBe(true);
  expect(component.hasClass("chq-ham")).toBe(true);
});

test("functions as a controlled component", () => {
  const component = mount(<HamburgerContainer />);

  component.find(Hamburger).simulate("click");
  component.update();

  expect(component.state().open).toBe(true);
  expect(component.find(Hamburger).props().open).toBe(true);
});
