import React, { useState } from "react";
import { mount } from "enzyme";

import Cheer from "../../Cheer";
import CheerButton from "../CheerButton";

const Container = ({ cheered: initialCheered, small }) => {
  const [cheered, setCheered] = useState(initialCheered || false);

  const onCheerToggle = nextCheered => {
    setCheered(nextCheered);
    return Promise.resolve();
  };

  return <CheerButton cheered={cheered} small={small} onCheerToggle={onCheerToggle} />;
};

test("has no violations", async () => {
  await expect(<CheerButton cheered />).toHaveNoViolations();
});

test("renders a button and calls back", () => {
  const onCheerToggle = jest.fn(() => Promise.resolve());
  const component = mount(<CheerButton onCheerToggle={onCheerToggle} />);

  component.simulate("click");
  expect(onCheerToggle).toHaveBeenLastCalledWith(true);
});

test("renders a Cheer if it has been cheered", () => {
  const component = mount(<CheerButton cheered />);

  expect(component.find(Cheer)).toHaveLength(2);
});

test("pops in the Cheer if it was not initially cheered", () => {
  const component = mount(<Container />);

  component.simulate("click");
  component.update();

  expect(component.find(Cheer)).toHaveLength(2);
  expect(component.find(Cheer).last().find("svg").hasClass("chq-chr-pp")).toBe(true);
});

test("does not pop in the Cheer if it was initially cheered", () => {
  const component = mount(<Container cheered />);

  expect(component.find(Cheer)).toHaveLength(2);
  expect(component.find(Cheer).last().find("svg").hasClass("chq-chr-pp")).toBe(false);
});

test("does not display text when small", () => {
  const component = mount(<Container small />);

  expect(component.text()).toEqual("");
});
