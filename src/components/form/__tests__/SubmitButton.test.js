import React from "react";
import { render } from "@testing-library/react";

import SubmitButton from "../SubmitButton";
import Form from "../Form";

test("renders without crashing", () => {
  const message = submitting => (submitting ? "Loading..." : "Load");
  const { queryByText, rerender } = render(<Form><SubmitButton>{message}</SubmitButton></Form>);

  expect(queryByText(message(false))).toBeTruthy();

  rerender(<Form><SubmitButton submitting>{message}</SubmitButton></Form>);

  expect(queryByText(message(true))).toBeTruthy();
});

test("uses the default text if children is not provided", () => {
  const { queryByText, rerender } = render(<Form><SubmitButton /></Form>);

  expect(queryByText("Submit")).toBeTruthy();

  rerender(<Form><SubmitButton submitting /></Form>);

  expect(queryByText("Submitting...")).toBeTruthy();
});
