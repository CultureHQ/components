import React from "react";
import { mount } from "enzyme";

import DoorEffect from "../DoorEffect";

test("adds the -show class", () => {
  const component = mount(<DoorEffect className="test" />);
  expect(component.find("div").instance().className).toEqual("test");

  component.setProps({ open: true });
  expect(component.find("div").instance().className).toEqual("test test-open");

  component.setProps({ open: false });
  expect(component.find("div").instance().className).toEqual("test test-closed");

  return new Promise(resolve => {
    setTimeout(() => {
      expect(component.find("div").instance().className).toEqual("test");
      resolve();
    }, 200);
  });
});
