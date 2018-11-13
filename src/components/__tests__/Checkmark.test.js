import React from "react";
import { shallow } from "enzyme";

import Checkmark from "../Checkmark";

test("has no violations", async () => {
  await expect(<Checkmark />).toHaveNoViolations();
});

test("renders without crashing", () => {
  const component = shallow(<Checkmark />);

  expect(component.type()).toEqual("button");
});

test("passes on className", () => {
  const component = shallow(<Checkmark className="checkmark" />);

  expect(component.hasClass("checkmark")).toBe(true);
});

test("passes on onClick", () => {
  const onClick = jest.fn();

  const component = shallow(<Checkmark checked onClick={onClick} />);
  expect(onClick).not.toHaveBeenCalled();

  component.simulate("click");
  expect(onClick).toHaveBeenLastCalledWith(false);
});
