import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import ClickClose from "../ClickClose";

test("has no violations", () => (
  expect(<ClickClose onClose={jest.fn()}>Test</ClickClose>).toHaveNoViolations()
));

test("calls onClose when appropriate", () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <main>
      <ClickClose onClose={onClose} className="inside">Inside</ClickClose>
      <div>Outside</div>
    </main>
  );

  fireEvent.click(getByText("Inside"));
  expect(onClose).not.toHaveBeenCalled();

  fireEvent.click(getByText("Outside"));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("passes on other props", () => {
  const { queryByLabelText } = render(
    <ClickClose aria-label="Label" onClose={jest.fn()}>
      Test
    </ClickClose>
  );

  expect(queryByLabelText("Label")).toBeTruthy();
});
