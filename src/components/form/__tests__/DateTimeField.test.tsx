import React from "react";
import { fireEvent, render } from "@testing-library/react";

import DateTimeField from "../DateTimeField";
import Form from "../Form";
import SubmitButton from "../SubmitButton";

test("functions as expected", () => {
  const onSubmit = jest.fn(() => Promise.resolve());
  const initialValues = {
    datetime: new Date(2018, 0, 1, 0, 0, 0).toISOString()
  };

  const { getByLabelText, getByText } = render(
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      <DateTimeField name="datetime">Date time!</DateTimeField>
      <SubmitButton />
    </Form>
  );

  fireEvent.click(getByLabelText("Open calendar"));
  fireEvent.click(getByText("15"));
  fireEvent.click(getByText("01:00 PM"));
  fireEvent.click(getByText("Submit"));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({ datetime: "2018-01-15T13:00:00.000Z" });
});

test("works without a value passed in", () => {
  const { queryAllByRole } = render(
    <DateTimeField name="datetime">Date time!</DateTimeField>
  );

  expect(queryAllByRole("button")).toHaveLength(1);
});

test("allows clicking on select before making a time selection", () => {
  const onChange = jest.fn();
  const { getByLabelText, getByText } = render(
    <DateTimeField name="datetime" onChange={onChange}>
      Date time!
    </DateTimeField>
  );

  fireEvent.click(getByLabelText("Open calendar"));
  fireEvent.click(getByText("15"));
  fireEvent.click(getByText("Select"));

  expect(onChange.mock.calls[1][0].endsWith("T12:00:00.000Z")).toBe(true);
});

test("works when clicking on a time before a date", () => {
  const onChange = jest.fn();
  const { getByLabelText, getByText } = render(
    <DateTimeField name="datetime" onChange={onChange}>
      Date time!
    </DateTimeField>
  );

  fireEvent.click(getByLabelText("Open calendar"));
  fireEvent.click(getByText("01:00 PM"));

  expect(onChange.mock.calls[0][0].endsWith("T13:00:00.000Z")).toBe(true);
});
