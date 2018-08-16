import React from "react";
import { shallow } from "enzyme";

import { Spinner } from "../src";

test("renders without crashing", async () => {
  const component = shallow(<Spinner />);
  expect(component.type()).toEqual("div");
});

test("passes on className", () => {
  const component = shallow(<Spinner className="spinner" />);

  expect(component.hasClass("spinner")).toBe(true);
  expect(component.hasClass("chq-spn")).toBe(true);
});
