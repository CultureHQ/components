import React from "react";
import { mount } from "enzyme";

import ActionButton from "../ActionButton";
import Icon from "../../Icon";

test("has no violations", async () => {
  await expect(<ActionButton>This is a button.</ActionButton>).toHaveNoViolations();
});

test("renders without crashing", () => {
  const message = "This is a button.";
  const component = mount(<ActionButton>{message}</ActionButton>);

  expect(component.html()).toContain(message);
});

test("passes on extra props", () => {
  const component = mount(<ActionButton className="button" />);

  expect(component.find("button").hasClass("button")).toBe(true);
});

test("displays a regular icon", () => {
  const component = mount(<ActionButton icon="edit">Button</ActionButton>);

  expect(component.find(Icon).props().icon).toEqual("edit");
});
