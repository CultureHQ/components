import React from "react";
import { shallow, mount } from "enzyme";

import { Button, Icon } from "../src";

test("renders without crashing", () => {
  const message = "This is a button.";
  const component = shallow(<Button>{message}</Button>);

  expect(component.html()).toContain(message);
});

test("passes on extra props", () => {
  const component = shallow(<Button className="button" />);

  expect(component.hasClass("button")).toBe(true);
});

test("displays a loading indicator", () => {
  const component = mount(<Button loading>Loading</Button>);

  expect(component.find(Icon).props().icon).toEqual("load-c");
});

test("displays a regular icon", () => {
  const component = mount(<Button icon="edit">Button</Button>);

  expect(component.find(Icon).props().icon).toEqual("edit");
});

test("loading overrides the regular icon", () => {
  const component = mount(<Button loading icon="edit">Button</Button>);

  expect(component.find(Icon).props().icon).toEqual("load-c");
});
