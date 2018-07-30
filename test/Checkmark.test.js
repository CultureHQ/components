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
  let returnValue;
  const onClick = checked => {
    returnValue = checked;
  };

  const component = shallow(<Checkmark checked onClick={onClick} />);
  expect(returnValue).toBe(undefined);

  component.simulate("click");
  expect(returnValue).toBe(false);
});
