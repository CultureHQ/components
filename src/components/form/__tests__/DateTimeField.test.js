import React from "react";
import { mount } from "enzyme";

import DateTimeField from "../DateTimeField";
import Form from "../Form";

test("functions as expected", () => {
  let received = null;
  const onSubmit = values => {
    received = values;
    return Promise.resolve();
  };

  const initialValues = { datetime: new Date(2018, 0, 1, 0, 0, 0).toISOString() };
  const component = mount(
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      <DateTimeField name="datetime" />
    </Form>
  );

  component.find("button.chq-ffd--ctrl").simulate("click");
  component.find("button.chq-cal--day").at(15).simulate("click");
  component.find("button.chq-tsl--op").at(52).simulate("click");
  component.instance().submit();

  expect(received.datetime).toEqual("2018-01-15T13:00:00.000Z");
});

test("works without a value passed in", () => {
  const component = mount(<DateTimeField />);

  expect(component.find("button")).toHaveLength(1);
});

test("allows clicking on select before making a time selection", () => {
  let received = null;
  const onChange = value => {
    received = value;
  };

  const component = mount(<DateTimeField onChange={onChange} />);

  component.find("button.chq-ffd--ctrl").simulate("click");
  component.find("button.chq-cal--day").at(15).simulate("click");
  component.find("Button").simulate("click");

  expect(received.endsWith("T12:00:00.000Z")).toBe(true);
});

test("works when clicking on a time before a date", () => {
  let received = null;
  const onChange = value => {
    received = value;
  };

  const component = mount(<DateTimeField onChange={onChange} />);

  component.find("button.chq-ffd--ctrl").simulate("click");
  component.find("button.chq-tsl--op").at(52).simulate("click");

  expect(received.endsWith("T13:00:00.000Z")).toBe(true);
});
