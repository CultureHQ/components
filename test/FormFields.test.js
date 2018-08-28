import React from "react";
import { mount } from "enzyme";

import * as FormFields from "../src/components/FormFields";

const CASES = Object.keys(FormFields).map(fieldName => [FormFields[fieldName]]);

test.each(CASES)("passes on className", FormField => {
  const component = mount(<FormField name="name" className="form-field" />);

  expect(component.find("label").hasClass("chq-ffd")).toBe(true);
  expect(component.find("label").hasClass("form-field")).toBe(true);
});

test.each(CASES)("calls up to callbacks if they are provided", FormField => {
  const response = {
    changeValue: null,
    formChangeName: null,
    formChangeValue: null
  };

  const component = mount(
    <FormField
      name="name"
      onChange={changeValue => {
        Object.assign(response, { changeValue });
      }}
      onFormChange={(formChangeName, formChangeValue) => {
        Object.assign(response, { formChangeName, formChangeValue });
      }}
    />
  );

  component.find("input").simulate("change", { target: { value: "Kevin" } });

  expect(response).toEqual({
    changeValue: "Kevin",
    formChangeName: "name",
    formChangeValue: "Kevin"
  });
});

test.each(CASES)("tracks focus in component state", FormField => {
  const component = mount(<FormField name="name" required />);

  component.find("input").simulate("blur");
  expect(component.text()).toEqual("Required");

  component.find("input").simulate("focus");
  expect(component.text()).toEqual("");
});
