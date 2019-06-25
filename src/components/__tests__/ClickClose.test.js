import React from "react";
import { act, fireEvent, render } from "@testing-library/react";

import ClickClose from "../ClickClose";

test("has no violations", () => (
  expect(<ClickClose>Test</ClickClose>).toHaveNoViolations()
));

test("calls onClose when appropriate", () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <main>
      <ClickClose onClose={onClose} className="inside">Inside</ClickClose>
      <div>Outside</div>
    </main>
  );

  act(() => void fireEvent.click(getByText("Inside")));
  expect(onClose).not.toHaveBeenCalled();

  act(() => void fireEvent.click(getByText("Outside")));
  expect(onClose).toHaveBeenCalled();
});

test("passes on other props", () => {
  const { queryByLabelText } = render(<ClickClose aria-label="Label" />);

  expect(queryByLabelText("Label")).toBeTruthy();
});
