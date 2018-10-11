import React from "react";
import { mount } from "enzyme";

import { Tooltip } from "../src";

test("has no violations", async () => {
  const component = <Tooltip tip="Tip">Inner content</Tooltip>;

  await expect(component).toHaveNoViolations();
});

test("resizes when the window resizes and dedups resize events", done => {
  const component = mount(<Tooltip tip="Tip">Inner content</Tooltip>);

  const recompute = jest.fn();
  component.instance().requestComputeOffsets = recompute;

  global.innerWidth = 200;
  global.dispatchEvent(new Event("resize"));
  global.dispatchEvent(new Event("resize"));
  global.dispatchEvent(new Event("resize"));

  setTimeout(() => {
    expect(recompute).toHaveBeenCalledTimes(1);
    component.unmount();
    done();
  }, 1000);
});

test("ensures the bubble is not too far to the left", () => {
  const component = mount(<Tooltip tip="Tip">Inner content</Tooltip>);
  const style = {};

  component.instance().bubble.current = { offsetWidth: 300, style };
  component.instance().computeOffsets();

  expect(style.left).toEqual("10px");
});

test("does not break when one of the refs is null", () => {
  const component = mount(<Tooltip tip="Tip">Inner content</Tooltip>);
  component.instance().bubble.current = null;

  expect(() => component.instance().computeOffsets()).not.toThrow();
});
