import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import FileField from "../FileField";

const Container = props => {
  const [value, setValue] = useState(null);

  return <FileField {...props} value={value} onChange={setValue} />;
};

test("passes on className", () => {
  const { container } = render(<FileField name="name" className="file" />);

  expect(container.firstChild.classList).toContain("file");
});

test("calls up to onChange if it is provided", () => {
  const onChange = jest.fn();
  const { getByRole } = render(<FileField name="file" onChange={onChange} />);

  const file = { name: "foo" };
  fireEvent.change(getByRole("textbox"), { target: { files: [file] } });

  expect(onChange).toHaveBeenCalledWith(file);
});

test("tracks touch status in component state", () => {
  const { getByRole, queryByText } = render(<FileField name="name" required />);
  expect(queryByText("Required")).toBeFalsy();

  fireEvent.change(getByRole("textbox"), {
    target: { files: [{ foo: "bar" }] }
  });

  expect(queryByText("Required")).toBeTruthy();
});

test("works with multiple files", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <FileField multiple name="files" onChange={onChange} />
  );

  const files = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
  fireEvent.change(getByRole("textbox"), { target: { files } });

  expect(onChange).toHaveBeenCalledWith(files);
});

test("displays an accurate summary", () => {
  const files = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
  const { container, getByRole } = render(<Container multiple name="files" />);

  const summary = container.querySelector(".chq-ffd--fd");

  fireEvent.change(getByRole("textbox"), { target: { files } });
  expect(summary.textContent).toEqual("foo, bar, baz");

  fireEvent.change(getByRole("textbox"), { target: { files: [] } });
  expect(summary.textContent).toEqual("");
});

test("accepts autoFocus", () => {
  render(<FileField name="file" autoFocus />);

  expect(document.activeElement.id).toEqual("file");
});
