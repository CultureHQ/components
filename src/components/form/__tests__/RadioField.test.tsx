import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import RadioField from "../RadioField";
import Form from "../Form";
import SubmitButton from "../SubmitButton";

const testOptions = [
  { value: "gryffindor", label: "Gryffindor" },
  { value: "hufflepuff", label: "Hufflepuff" },
  { value: "ravenclaw", label: "Ravenclaw" },
  { value: "slytherin", label: "Slytherin" }
];

test("has no violations", () => (
  expect(
    <RadioField name="radio" options={testOptions}>
      Radio!
    </RadioField>
  ).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(
    <RadioField name="radio" className="radio" options={testOptions}>
      Radio!
    </RadioField>
  );

  expect(container.querySelector(".radio")).toBeTruthy();
});

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getAllByRole } = render(
    <Form onSubmit={jest.fn()}>
      <RadioField name="radio" options={testOptions} onChange={onChange}>
        Radio!
      </RadioField>
    </Form>
  );

  fireEvent.click(getAllByRole("radio")[1]);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(testOptions[1].value);
});

test("tracks touch status in component state", () => {
  const { getAllByRole, queryByText } = render(
    <RadioField required name="radio" options={testOptions}>
      Radio!
    </RadioField>
  );

  const radios = getAllByRole("radio");
  expect(queryByText("Required")).toBeFalsy();

  fireEvent.change(radios[0], { target: { value: null } });
  fireEvent.blur(radios[0]);

  expect(queryByText("Required")).toBeTruthy();
});

test("displays errors if submitted", () => {
  const { queryByText, getByRole } = render(
    <Form onSubmit={jest.fn()}>
      <RadioField name="radio" options={testOptions} required>
        Radio!
      </RadioField>
    </Form>
  );

  expect(queryByText("Required")).toBeFalsy();

  fireEvent.click(getByRole("button"));

  expect(queryByText("Required")).toBeTruthy();
});
