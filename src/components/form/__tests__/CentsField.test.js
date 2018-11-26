import React from "react";
import { mount } from "enzyme";

import CentsField from "../CentsField";
import Form from "../Form";

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const component = mount(<CentsField name="cents" onChange={onChange} />);

  component.find("input").simulate("change", { target: { value: 1.23 } });

  expect(onChange).toHaveBeenCalledWith(123);
});

test("displays the value using cents", () => {
  const component = mount(<CentsField name="cents" value={123} />);

  expect(component.find("input").props().value).toEqual(1.23);
});

test("validates that the value cannot be <= 0", () => {
  const component = mount(<Form><CentsField name="cents" value={-5} /></Form>);

  expect(component.state().errors.cents).not.toBe(undefined);
});

test("handles cases where the value is empty", () => {
  const onChange = jest.fn();
  const component = mount(<CentsField name="cents" onChange={onChange} />);

  component.find("input").simulate("change", { target: { value: "" } });

  expect(onChange).toHaveBeenLastCalledWith(null);
});

test("functions without an onChange", () => {
  const component = mount(<CentsField name="cents" />);
  component.find("input").simulate("change", { target: { value: "" } });
});
