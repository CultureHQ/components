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
  const onClick = jest.fn();

  const component = shallow(<Badge onClick={onClick} />);
  expect(onClick).not.toHaveBeenCalled();

  component.simulate("click");
  expect(onClick).toHaveBeenCalled();
});

test("displays an icon if one is provided", () => {
  const component = mount(<Badge icon="clipboard" />);

  expect(component.find("svg")).toHaveLength(1);
});

test("passes along any other props", () => {
  const component = shallow(<Badge data-value="foo" />);

  expect(component.find("[data-value=\"foo\"]")).toHaveLength(1);
});
