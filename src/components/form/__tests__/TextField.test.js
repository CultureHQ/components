import React from "react";
import { mount } from "enzyme";

import TextField from "../TextField";
import Form from "../Form";

test("has no violations", async () => {
  await expect(<TextField name="text">Text</TextField>).toHaveNoViolations();
});

test("passes on className", () => {
  const component = mount(<TextField name="text" className="text-field" />);

  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("text-field")).toBe(true);
});

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const component = mount(<TextField name="text" onChange={onChange} />);

  component.find("textarea").simulate("change", { target: { value: "Kevin" } });

  expect(onChange).toHaveBeenCalledWith("Kevin");
});

test("tracks touch status in component state", () => {
  const component = mount(<Form><TextField name="text" required /></Form>);
  expect(component.text()).toEqual("");

  component.find("textarea").simulate("change", { target: { value: "" } });
  component.find("textarea").simulate("blur");
  expect(component.text()).toEqual("Required");
});

test("displays errors if submitted", () => {
  const component = mount(<Form><TextField name="text" required /></Form>);
  expect(component.text()).toEqual("");

  component.setState({ submitted: true });
  expect(component.text()).toEqual("Required");
});

test("requests focus when autoFocus is given", () => {
  const component = mount(<TextField name="text" autoFocus />);

  expect(component.find("textarea").props().id).toEqual(document.activeElement.id);
});
