import React from "react";
import { mount, shallow } from "enzyme";

import Badge from "../Badge";

test("has no violations", async () => {
  await expect(<Badge>This is a badge.</Badge>).toHaveNoViolations();
});

test("renders without crashing", () => {
  const message = "This is a badge.";
  const component = shallow(<Badge>{message}</Badge>);

  expect(component.html()).toContain(message);
});

test("passes on className", () => {
  const component = shallow(<Badge className="badge" />);

  expect(component.hasClass("badge")).toBe(true);
  expect(component.hasClass("chq-bdg")).toBe(true);
});

test("passes on onClick", () => {
  let clicked = false;
  const onClick = () => {
    clicked = true;
  };

  const component = shallow(<Badge onClick={onClick} />);
  expect(clicked).toBe(false);

  component.simulate("click");
  expect(clicked).toBe(true);
});

test("displays an icon if one is provided", () => {
  const component = mount(<Badge icon="clipboard" />);

  expect(component.find("svg")).toHaveLength(1);
});
