import React from "react";
import { mount } from "enzyme";

import { BooleanField, Checkmark } from "../../src";

test("calls up to callbacks if they are provided", () => {
  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <BooleanField
      name="boolean"
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.find("button").simulate("click");

  expect(response).toEqual({
    changeValue: true,
    formChangeName: "boolean",
    formChangeValue: true
  });
});

test("works with initial values", () => {
  const component = mount(<BooleanField name="boolean" value />);

  expect(component.find(Checkmark).props().checked).toBe(true);

  component.find("button").simulate("click");
});
