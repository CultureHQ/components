import React from "react";
import { mount } from "enzyme";

import { Cheer, Tooltip } from "../src";

test("passes on className", () => {
  const component = mount(<Cheer className="cheer" />);

  expect(component.find("svg").hasClass("cheer")).toBe(true);
  expect(component.find("svg").hasClass("chq-chr")).toBe(true);
});

test("allows you to pass different colors", () => {
  const component = mount(<Cheer color="yellow" />);

  expect(component.find("svg").hasClass("chq-chr-yw")).toBe(true);
  expect(component.find("svg").hasClass("chq-chr")).toBe(true);
});

test("renders a tooltip if you pass a name", () => {
  const component = mount(<Cheer name="Harry" />);

  expect(component.find(Tooltip)).toHaveLength(1);
});

test("adds the animation class if the pop prop is passed", () => {
  const component = mount(<Cheer pop />);

  expect(component.find("svg").hasClass("chq-chr-pp")).toBe(true);
});
