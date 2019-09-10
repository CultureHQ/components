import React from "react";
import { fireEvent, render } from "@testing-library/react";

import SubmitButton from "../SubmitButton";
import Form from "../Form";

test("renders without crashing", () => {
  const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000));
  const message = submitting => (submitting ? "Loading..." : "Load");

  const { getByRole, queryByText } = render(
    <Form onSubmit={onSubmit}><SubmitButton>{message}</SubmitButton></Form>
  );

  expect(queryByText(message(false))).toBeTruthy();

  fireEvent.click(getByRole("button"));

  expect(queryByText(message(true))).toBeTruthy();
});

test("uses the default text if children is not provided", () => {
  const onSubmit = () => new Promise(resolve => setTimeout(resolve, 1000));
  const { getByRole, queryByText } = render(
    <Form onSubmit={onSubmit}><SubmitButton /></Form>
  );

  expect(queryByText("Submit")).toBeTruthy();

  fireEvent.click(getByRole("button"));

  expect(queryByText("Submitting...")).toBeTruthy();
});
