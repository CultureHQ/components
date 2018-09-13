import React from "react";
import { shallow } from "enzyme";

import { Cheer } from "../src";

test("renders without crashing", () => {
  const component = shallow(<Cheer />);

  expect(component.type()).toEqual("svg");
});

test("passes on className", () => {
  const component = shallow(<Cheer className="cheer" />);

  expect(component.hasClass("cheer")).toBe(true);
  expect(component.hasClass("chq-chr")).toBe(true);
});

test("allows you to pass different colors", () => {
  const component = shallow(<Cheer color="yellow" />);

  expect(component.hasClass("chq-chr-yw")).toBe(true);
  expect(component.hasClass("chq-chr")).toBe(true);
});
