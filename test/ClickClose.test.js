import React from "react";
import { mount } from "enzyme";

import { ClickClose } from "../src";

test("has no violations", async () => {
  await expect(<ClickClose>Test</ClickClose>).toHaveNoViolations();
});

test("calls onClose when appropriate", () => {
  const events = {};
  window.addEventListener = jest.fn((event, callback) => {
    events[event] = callback;
  });

  let received = false;
  const onClose = () => {
    received = true;
  };

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
  expect(received).toBe(false);

  events.click({ target: component.find("div.outside").instance() });
  expect(received).toBe(true);
});
