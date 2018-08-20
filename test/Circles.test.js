import React from "react";
import { shallow } from "enzyme";

import { Circles } from "../src";

test("renders without crashing", () => {
  const component = shallow(<Circles />);

  expect(component.type()).toEqual("svg");
});

test("passes on className", () => {
  const component = shallow(<Circles className="circles" />);

  expect(component.hasClass("circles")).toBe(true);
  expect(component.hasClass("chq-cir")).toBe(true);
});
