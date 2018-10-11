import React from "react";
import { shallow, mount } from "enzyme";

import { Checklist } from "../src";

test("has no violations", async () => {
  const component = (
    <Checklist>
      <Checklist.Item>This is unchecked.</Checklist.Item>
      <Checklist.Item checked>This is checked.</Checklist.Item>
    </Checklist>
  );

  await expect(component).toHaveNoViolations();
});

test("renders without crashing", () => {
  const component = shallow(<Checklist />);

  expect(component.type()).toEqual("div");
});

test("passes on className", () => {
  const component = shallow(<Checklist className="checklist" />);

  expect(component.hasClass("checklist")).toBe(true);
});

test("renders an item without crashing", () => {
  const message = "checklist item";
  const component = mount(<Checklist.Item checked>{message}</Checklist.Item>);

  expect(component.find("button").hasClass("chq-cmk-ck")).toBe(true);
  expect(component.find("button").text()).toContain(message);
});
