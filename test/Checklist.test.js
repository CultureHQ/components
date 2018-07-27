import React from "react";
import { shallow, mount } from "enzyme";

import Checklist from "../src/components/Checklist";

test("renders without crashing", () => {
  const component = shallow(<Checklist />);

  expect(component.type()).toEqual("dl");
});

test("passes on className", () => {
  const component = shallow(<Checklist className="checklist" />);

  expect(component.hasClass("checklist")).toBe(true);
});

test("renders an item without crashing", () => {
  const message = "checklist item";
  const component = mount(<Checklist.Item checked>{message}</Checklist.Item>);

  expect(component.find("button").hasClass("chq-cmk-ck")).toBe(true);
  expect(component.find("dd").text()).toContain(message);
});
