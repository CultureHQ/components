import React from "react";
import { shallow } from "enzyme";

import { Table } from "../src";

test("renders without crashing", () => {
  const component = shallow(<Table />);

  expect(component.type()).toEqual("table");
});

test("passes on className", () => {
  const component = shallow(<Table className="table" />);

  expect(component.hasClass("table")).toBe(true);
});
