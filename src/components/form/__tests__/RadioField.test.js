import React from "react";
import { mount } from "enzyme";

import RadioField from "../RadioField";
import Form from "../Form";

const testOptions = [
  { value: "gryffindor", label: "Gryffindor" },
  { value: "hufflepuff", label: "Hufflepuff" },
  { value: "ravenclaw", label: "Ravenclaw" },
  { value: "slytherin", label: "Slytherin" }
];

test("has no violations", async () => {
  await expect(
    <RadioField name="radio" options={testOptions}>
      Radio
    </RadioField>
  ).toHaveNoViolations();
});

test("passes on className", () => {
  const component = mount(<RadioField name="radio" className="radio" />);

  expect(component.find(".chq-ffd").hasClass("radio")).toBe(true);
});

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const component = mount(
    <Form>
      <RadioField name="radio" options={testOptions} onChange={onChange} />
    </Form>
  );

  component.find("label input").at(0).simulate("change", {
    target: { value: testOptions[0].value }
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(testOptions[0].value);
});

test("tracks touch status in component state", () => {
  const component = mount(
    <RadioField required name="radio" options={testOptions} />
  );

  component.find("input").at(0).simulate("change", { target: { value: null } });
  component.find("input").at(0).simulate("blur");

  expect(component.find("FormError").text()).toEqual("Required");
});

test("displays errors if submitted", () => {
  const component = mount(<Form><RadioField name="radio" options={testOptions} required /></Form>);
  expect(component.find("FormError").text()).toEqual(null);

  component.setState({ submitted: true });
  expect(component.find("FormError").text()).toEqual("Required");
});
