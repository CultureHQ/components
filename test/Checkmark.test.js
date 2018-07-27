import React from "react";
import { shallow } from "enzyme";

import Checkmark from "../src/components/Checkmark";

test("renders without crashing", () => {
  const component = shallow(<Checkmark />);

  expect(component.type()).toEqual("button");
});

test("passes on className", () => {
  const component = shallow(<Checkmark className="checkmark" />);

  expect(component.hasClass("checkmark")).toBe(true);
});

test("passes on onClick", () => {
  let clicked = false;
  const onClick = () => {
    clicked = true;
  };

  const component = shallow(<Checkmark onClick={onClick} />);
  expect(clicked).toBe(false);

  component.simulate("click");
  expect(clicked).toBe(true);
});
