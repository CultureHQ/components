import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import SearchBar from "../SearchBar";

test("has no violations", () => (
  expect(<SearchBar />).toHaveNoViolations()
));

test("handles autoFocus", () => {
  render(<SearchBar autoFocus />);

  const searchBarElement = document.activeElement as HTMLInputElement;

  expect(searchBarElement instanceof HTMLInputElement).toBe(true);
  expect(searchBarElement.name).toEqual("search");
});

test("throttles search changes", () => {
  const onSearch = jest.fn(() => Promise.resolve());
  const { getByRole } = render(<SearchBar onSearch={onSearch} />);

  const searchbox = getByRole("searchbox");

  [1, 2, 3, 4, 5].forEach(index => {
    fireEvent.change(searchbox, { target: { value: "Harry".slice(0, index) } });
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
  const { getByRole } = render(<SearchBar onSearch={onSearch} />);

  const searchbox = getByRole("searchbox");
  fireEvent.change(searchbox, { target: { value: "Harry" } });
  fireEvent.change(searchbox, { target: { value: "Harry" } });

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
  const { getByRole } = render(<SearchBar onSearch={onSearch} />);

  const searchbox = getByRole("searchbox");
  fireEvent.change(searchbox, { target: { value: "Harry" } });
  fireEvent.change(searchbox, { target: { value: "Harry" } });
  fireEvent.change(searchbox, { target: { value: "" } });

  expect(onSearch).toHaveBeenCalledTimes(1);
  expect(onSearch).toHaveBeenCalledWith("");
});

test("supports the autoComplete prop", () => {
  const { getByRole } = render(<SearchBar autoComplete="off" />);

  expect(getByRole("searchbox")).toHaveProperty("autocomplete", "off");
});
