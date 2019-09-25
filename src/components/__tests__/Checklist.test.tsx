import React from "react";
import { render } from "@testing-library/react";

import Checklist from "../Checklist";

test("has no violations", () => {
  const component = (
    <Checklist>
      <Checklist.Item>This is unchecked.</Checklist.Item>
      <Checklist.Item checked>This is checked.</Checklist.Item>
    </Checklist>
  );

  return expect(component).toHaveNoViolations();
});

test("passes on className", () => {
  const { container } = render(
    <Checklist className="checklist">
      <Checklist.Item>checklist item</Checklist.Item>
    </Checklist>
  );

  expect(container.querySelector(".checklist")).toBeTruthy();
});

test("renders an item without crashing", () => {
  const text = "checklist item";
  const { queryByText } = render(
    <Checklist.Item checked>{text}</Checklist.Item>
  );

  expect(queryByText(text)).toBeTruthy();
});
