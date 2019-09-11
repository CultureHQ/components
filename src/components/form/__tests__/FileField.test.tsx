import * as React from "react";
import { fireEvent, render } from "@testing-library/react";

import FileField, { FileFieldValue } from "../FileField";

type HijackedProps = "children" | "value" | "onChange";
type ContainerProps = Omit<React.ComponentProps<typeof FileField>, HijackedProps>;

const Container = (props: ContainerProps) => {
  const [value, setValue] = React.useState<FileFieldValue>(null);

  return <FileField {...props} value={value} onChange={setValue}>File!</FileField>;
};

test("passes on className", () => {
  const { container } = render(
    <FileField name="name" className="file">File!</FileField>
  );

  const inputElement = container.firstChild as HTMLElement;

  expect(inputElement).not.toBe(null);
  expect(inputElement.classList).toContain("file");
});

test("calls up to onChange if it is provided", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <FileField name="file" onChange={onChange}>File!</FileField>
  );

  const file = { name: "foo" };
  fireEvent.change(getByRole("textbox"), { target: { files: [file] } });

  expect(onChange).toHaveBeenCalledWith(file);
});

test("tracks touch status in component state", () => {
  const { getByRole, queryByText } = render(
    <FileField name="name" required>File!</FileField>
  );

  expect(queryByText("Required")).toBeFalsy();

  fireEvent.change(getByRole("textbox"), {
    target: { files: [{ foo: "bar" }] }
  });

  expect(queryByText("Required")).toBeTruthy();
});

test("works with multiple files", () => {
  const onChange = jest.fn();
  const { getByRole } = render(
    <FileField multiple name="files" onChange={onChange}>File!</FileField>
  );

  const files = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
  fireEvent.change(getByRole("textbox"), { target: { files } });

  expect(onChange).toHaveBeenCalledWith(files);
});

test("displays an accurate summary", () => {
  const files = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
  const { container, getByRole } = render(<Container multiple name="files" />);

  const summary = container.querySelector(".chq-ffd--fd") as HTMLElement;
  expect(summary).not.toBe(null);

  fireEvent.change(getByRole("textbox"), { target: { files } });
  expect(summary.textContent).toEqual("foo, bar, baz");

  fireEvent.change(getByRole("textbox"), { target: { files: [] } });
  expect(summary.textContent).toEqual("");
});

test("accepts autoFocus", () => {
  render(<FileField name="file" autoFocus>File!</FileField>);

  const inputElement = document.activeElement as HTMLInputElement;

  expect(inputElement).not.toBe(null);
  expect(inputElement.id).toEqual("file");
});
