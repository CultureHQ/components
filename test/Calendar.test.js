import React from "react";
import { mount } from "enzyme";

import { Calendar } from "../src";

test("functions properly when no value is passed in", () => {
  const component = mount(<Calendar />);

  expect(component.find("CalendarDay").length).toBeGreaterThan(0);
});

test("displays expected days with padding at beginning and end", () => {
  const value = new Date(2018, 0, 1, 0, 0, 0);
  const component = mount(<Calendar value={value} />);

  expect(component.find("CalendarDay")).toHaveLength(35);
});

test("allows toggling left to go to previous months", () => {
  const value = new Date(2018, 0, 1, 0, 0, 0);
  const component = mount(<Calendar value={value} />);

  component.find("button.chq-cal--head--prev").simulate("click");
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("December 2017");
});

test("allows toggling right to go to next months", () => {
  const value = new Date(2018, 0, 1, 0, 0, 0);
  const component = mount(<Calendar value={value} />);

  component.find("button.chq-cal--head--next").simulate("click");
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("February 2018");
});

test("updates the visible month when a value is selected", () => {
  const value = new Date(2018, 0, 1, 0, 0, 0);
  const component = mount(<Calendar value={value} />);

  component.setProps({ value: new Date(2019, 0, 1, 0, 0, 0) });
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("January 2019");
});

test("does not attempt to update state if month did not change", () => {
  let received = null;
  const onChange = value => {
    received = value;
  };

  const value = new Date(2018, 0, 1, 0, 0, 0);
  const component = mount(<Calendar value={value} onChange={onChange} />);

  component.find("CalendarDay").at(15).simulate("click");
  expect(component.find(".chq-cal--head--lbl").text()).toEqual("January 2018");
  expect(received.getMonth()).toEqual(0);
});
