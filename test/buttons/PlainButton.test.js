import React from "react";
import { shallow } from "enzyme";

import { PlainButton } from "../../src";

test("renders without crashing", async () => {
  const message = "This is a button.";
  const component = <PlainButton>{message}</PlainButton>;

  expect(shallow(component).html()).toContain(message);
  await expect(component).toHaveNoViolations();
});

test("passes on className", () => {
  const component = shallow(<PlainButton className="plain-button" />);

  expect(component.hasClass("plain-button")).toBe(true);
  expect(component.hasClass("chq-pbn")).toBe(true);
});
