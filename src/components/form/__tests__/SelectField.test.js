import React, { useState } from "react";
import { createEvent, fireEvent, render, within } from "@testing-library/react";

import SelectField from "../SelectField";

const twice = callback => [0, 1].forEach(callback);

const makeFireChange = node => value => {
  const event = createEvent.change(node, { target: { value } });

  // We're doing this so that we can purposefully add to the nativeEvent side
  // of react's SyntheticEvent class
  event.data = value[value.length - 1];
  return node.dispatchEvent(event);
};

const getMultiValue = container => (
  Array.from(container.querySelectorAll("[name='select[]']")).map(node => node.value)
);

const OPTIONS = [
  { label: "Harry", value: "harry" },
  { label: "Hermione", value: "hermione" },
  { label: "Ron", value: "ron" }
];

const Container = ({ creatable = false, multiple = false, value: initialValue }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SelectField
      name="select"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      creatable={creatable}
      multiple={multiple}
    >
      Select
    </SelectField>
  );
};

test("has no violations", () => {
  const jsx = (
    <SelectField name="select" options={OPTIONS}>
      Select
    </SelectField>
  );

  return expect(jsx).toHaveNoViolations();
});

test("passes on className", () => {
  const { container } = render(
    <SelectField name="select" className="select-field" />
  );

  expect(container.firstChild.classList).toContain("select-field");
});

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <SelectField name="select" onChange={onChange} options={OPTIONS} />
  );

  fireEvent.click(getByText("Harry"));

  expect(onChange).toHaveBeenCalledWith("harry");
});

test("requests focus when autoFocus is given", () => {
  render(<SelectField name="select" autoFocus />);

  expect(document.activeElement.className).toEqual("chq-ffd--ctrl");
});

test("closes the options when clicked outside the select field", () => {
  const { container, getByLabelText } = render(
    <div>
      <Container />
      <div className="outside" />
    </div>
  );

  fireEvent.click(getByLabelText("Value"));

  fireEvent.click(getByLabelText("Value"));
  expect(container.querySelector(".chq-ffd--sl--opts-open")).toBeTruthy();

  fireEvent.click(container.querySelector(".outside"));
  expect(container.querySelector(".chq-ffd--sl--opts-open")).toBeFalsy();
});

test("working with a single non-creatable field", () => {
  const { container, getAllByRole, getByLabelText, getByText, queryAllByRole } = render(
    <Container value="harry" />
  );

  const fireChange = makeFireChange(getByLabelText("Value"));

  fireChange("H");
  expect(queryAllByRole("button")).toHaveLength(2);

  fireChange("He");
  expect(queryAllByRole("button")).toHaveLength(1);

  fireChange("Hel");
  expect(queryAllByRole("button")).toHaveLength(0);
  expect(getByText("No results found.")).toBeTruthy();

  fireChange("");
  expect(queryAllByRole("button")).toHaveLength(3);

  fireEvent.click(getAllByRole("button")[0]);
  expect(getByLabelText("Value")).toHaveProperty("value", "");

  fireEvent.click(getAllByRole("button")[1]);
  expect(getByLabelText("select")).toHaveProperty("value", OPTIONS[1].value);
  expect(getByLabelText("Value")).toHaveProperty("value", OPTIONS[1].label);

  twice(() => {
    fireEvent.keyDown(getByLabelText("Value"), { key: "Enter" });
    expect(container.querySelector(".chq-ffd--sl--opts-open")).toBeTruthy();
  });

  twice(() => {
    fireEvent.keyDown(getByLabelText("Value"), { key: "Escape" });
    expect(container.querySelector(".chq-ffd--sl--opts-open")).toBeFalsy();
  });

  fireEvent.keyDown(getByLabelText("Value"), { key: "Backspace" });
  expect(container.querySelector(".chq-ffd--sl--opts-open")).toBeFalsy();
});

test("working with a single creatable field", () => {
  const { getByLabelText, getByRole, queryAllByRole, queryByText } = render(
    <Container creatable />
  );

  makeFireChange(getByLabelText("Value"))("Hello");
  expect(queryAllByRole("button")).toHaveLength(1);
  expect(queryByText("No results found.")).toBeFalsy();

  fireEvent.click(getByRole("button"));
  expect(getByLabelText("select")).toHaveProperty("value", "Hello");
  expect(getByLabelText("Value")).toHaveProperty("value", "Hello");
});

test("working with a multiple non-creatable field", () => {
  const { container, getAllByRole, getByLabelText } = render(
    <Container multiple />
  );

  const fireChange = makeFireChange(getByLabelText("Search"));
  const options = within(container.querySelector(".chq-ffd--sl--opts"));

  fireEvent.click(getAllByRole("button")[0]);
  expect(document.activeElement.className).toEqual("chq-ffd--sl--match");

  fireChange("H");
  expect(options.getAllByRole("button")).toHaveLength(2);

  fireEvent.click(options.getAllByRole("button")[0]);
  expect(getMultiValue(container)).toEqual([OPTIONS[0].value]);

  fireEvent.click(options.getAllByRole("button")[1]);
  expect(getMultiValue(container)).toEqual([OPTIONS[0].value, OPTIONS[1].value]);

  fireEvent.click(options.getAllByRole("button")[0]);
  expect(getMultiValue(container)).toEqual([OPTIONS[1].value]);

  twice(() => {
    fireEvent.keyDown(getByLabelText("Search"), { key: "Escape" });
    expect(container.querySelector(".chq-ffd--sl--opts-open")).toBeFalsy();
  });

  twice(() => {
    fireEvent.keyDown(getByLabelText("Search"), { key: "Enter" });
    expect(container.querySelector(".chq-ffd--sl--opts-open")).toBeTruthy();
  });

  twice(() => {
    fireEvent.keyDown(getByLabelText("Search"), { key: "Backspace" });
    expect(getMultiValue(container)).toEqual([]);
  });

  fireChange("Test");
  fireEvent.keyDown(getByLabelText("Search"), { key: "Backspace" });
  expect(getMultiValue(container)).toEqual([]);

  fireEvent.keyDown(getByLabelText("Search"), { key: "Tab" });
});

test("working with a multiple creatable field", () => {
  const { container, getAllByRole, getByLabelText, queryAllByRole, queryByText } = render(
    <Container creatable multiple />
  );

  makeFireChange(getByLabelText("Search"))("Hello");
  expect(queryAllByRole("button")).toHaveLength(2);
  expect(queryByText("No results found.")).toBeFalsy();

  fireEvent.click(getAllByRole("button")[1]);
  expect(getMultiValue(container)).toEqual(["Hello"]);
});
