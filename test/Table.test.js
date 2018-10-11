import React from "react";
import { shallow } from "enzyme";

import { Table } from "../src";

test("renders without crashing", async () => {
  const component = <Table />;

  expect(shallow(component).type()).toEqual("table");
  await expect(component).toHaveNoViolations();
});

test("passes on className", () => {
  const component = shallow(<Table className="table" />);

  expect(component.hasClass("table")).toBe(true);
});
