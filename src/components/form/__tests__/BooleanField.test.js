import React from "react";
import { mount } from "enzyme";

import BooleanField from "../BooleanField";
import Checkmark from "../../Checkmark";

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const component = mount(<BooleanField name="boolean" onChange={onChange} />);

  component.find("button").simulate("click");

  expect(onChange).toHaveBeenCalledWith(true);
});

test("works with initial values", () => {
  const component = mount(<BooleanField name="boolean" value />);

  expect(component.find(Checkmark).props().checked).toBe(true);

  component.find("button").simulate("click");
});
