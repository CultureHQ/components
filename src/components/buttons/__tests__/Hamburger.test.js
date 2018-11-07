import React, { useState } from "react";
import { shallow, mount } from "enzyme";

import Hamburger from "../Hamburger";

const HamburgerContainer = ({ open: initialOpen }) => {
  const [open, setOpen] = useState(initialOpen);
  const onToggle = () => setOpen(prevOpen => !prevOpen);

  return <Hamburger open={open} onToggle={onToggle} />;
};

test("has no violations", async () => {
  await expect(<Hamburger />).toHaveNoViolations();
});

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

  expect(component.find(Hamburger).props().open).toBe(true);
});
