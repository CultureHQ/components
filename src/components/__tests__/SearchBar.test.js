import React from "react";
import { mount } from "enzyme";

import SearchBar from "../SearchBar";

test("has no violations", async () => {
  await expect(<SearchBar />).toHaveNoViolations();
});

test("handles autoFocus", () => {
  mount(<SearchBar autoFocus />);

  expect(document.activeElement.name).toEqual("search");
});

test("throttles search changes", () => {
  const onSearch = jest.fn(() => Promise.resolve());
  const component = mount(<SearchBar onSearch={onSearch} />);

  [1, 2, 3, 4, 5].forEach(index => {
    component.find("input").simulate("change", {
      target: { value: "Harry".slice(0, index) }
    });
  });

  return new Promise(resolve => {
    setTimeout(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith("Harry");
      resolve();
    }, 500);
  });
});

test("does not fire multiple queries for the same search", () => {
  const onSearch = jest.fn();
  const component = mount(<SearchBar onSearch={onSearch} />);

  component.find("input").simulate("change", { target: { value: "Harry" } });
  component.find("input").simulate("change", { target: { value: "Harry" } });

  return new Promise(resolve => {
    setTimeout(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith("Harry");
      resolve();
    }, 500);
  });
});

test("immediately calls onSearch when the value empties", () => {
  const onSearch = jest.fn();
  const component = mount(<SearchBar onSearch={onSearch} />);

  component.find("input").simulate("change", { target: { value: "Harry" } });
  component.find("input").simulate("change", { target: { value: "Harry" } });
  component.find("input").simulate("change", { target: { value: "" } });

  expect(onSearch).toHaveBeenCalledTimes(1);
  expect(onSearch).toHaveBeenCalledWith("");
});

test("supports the autoComplete prop", () => {
  const component = mount(<SearchBar autoComplete="off" />);

  expect(component.find("input").props().autoComplete).toEqual("off");
});
