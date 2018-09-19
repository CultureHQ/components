import React from "react";
import { mount } from "enzyme";

import { Icon } from "../src";
import { close } from "../src/icons.json";

test("renders without crashing", async () => {
  const component = mount(<Icon icon="checkmark" />);
  expect(component.find("path")).toHaveLength(0);

  await component.instance().componentDidMount();
  component.update();

  expect(component.find("path")).toHaveLength(1);
  component.unmount();
});

test("passes on className", () => {
  const component = mount(<Icon icon="checkmark" className="icon" />);

  expect(component.hasClass("icon")).toBe(true);
});

test("updates the icon when the prop changes", async () => {
  const component = mount(<Icon icon="checkmark" />);

  component.setProps({ icon: "close" });
  await component.instance().loadIcon();
  component.update();

  expect(component.state().d).toEqual(close.join(" "));
});

test("does not attempt to set state once it been unmounted", () => {
  const component = mount(<Icon icon="checkmark" />);

  component.instance().loadIcon();
  component.unmount();
});
