import React from "react";
import { mount } from "enzyme";

import ClickClose from "../ClickClose";

test("has no violations", async () => {
  await expect(<ClickClose>Test</ClickClose>).toHaveNoViolations();
});

test("calls onClose when appropriate", () => {
  const events = {};
  window.addEventListener = jest.fn((event, callback) => {
    events[event] = callback;
  });

  const onClose = jest.fn();
  const component = mount(
    <div>
      <ClickClose onClose={onClose} className="inside">
        Inside
      </ClickClose>
      <div className="outside">
        Outside
      </div>
    </div>
  );

  events.click({ target: component.find("div.inside").instance() });
  expect(onClose).not.toHaveBeenCalled();

  events.click({ target: component.find("div.outside").instance() });
  expect(onClose).toHaveBeenCalled();
});

test("passes on other props", () => {
  const component = mount(<ClickClose aria-label="Label" />);

  expect(component.find("div").props()["aria-label"]).toEqual("Label");
});
