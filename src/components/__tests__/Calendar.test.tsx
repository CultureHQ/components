import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Calendar from "../Calendar";

test("functions properly when no value is passed in", () => {
  const { queryByText } = render(<Calendar onChange={jest.fn()} />);

  expect(queryByText("15")).toBeTruthy();
});

test("displays expected days with padding at beginning and end", () => {
  const { queryAllByRole } = render(
    <Calendar year={2018} month={0} day={1} onChange={jest.fn()} />
  );

  expect(queryAllByRole("button")).toHaveLength(37);
});

test("allows toggling left to go to previous months", () => {
  const { getByLabelText, queryByText } = render(
    <Calendar year={2018} month={0} day={1} onChange={jest.fn()} />
  );

  fireEvent.click(getByLabelText("Previous month"));

  expect(queryByText("December 2017")).toBeTruthy();
});

test("allows toggling right to go to next months", () => {
  const { getByLabelText, queryByText } = render(
    <Calendar year={2018} month={0} day={1} onChange={jest.fn()} />
  );

  fireEvent.click(getByLabelText("Next month"));

  expect(queryByText("February 2018")).toBeTruthy();
});

test("updates the visible month when a value is selected", () => {
  const { rerender, queryByText } = render(
    <Calendar year={2018} month={0} day={1} onChange={jest.fn()} />
  );

  rerender(<Calendar year={2019} month={0} day={1} onChange={jest.fn()} />);

  expect(queryByText("January 2019")).toBeTruthy();
});

test("calls up to the onChange when a new date is clicked", () => {
  const onChange = jest.fn();
  const { getByText, queryByText } = render(
    <Calendar year={2018} month={0} day={1} onChange={onChange} />
  );

  fireEvent.click(getByText("15"));

  expect(onChange).toHaveBeenCalledWith(2018, 0, 15);
  expect(queryByText("January 2018")).toBeTruthy();
});
