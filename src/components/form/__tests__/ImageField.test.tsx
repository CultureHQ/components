import React from "react";
import { fireEvent, render } from "@testing-library/react";

import ImageField from "../ImageField";
import mockImage from "../../../../test/image";

jest.mock("cropperjs", () => class {
  destroy() {} // eslint-disable-line class-methods-use-this

  getCroppedCanvas() { // eslint-disable-line class-methods-use-this
    return { toDataURL: () => mockImage };
  }
});

test("has no violations", () => (
  expect(<ImageField name="image">Image!</ImageField>).toHaveNoViolations()
));

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <ImageField name="image" onChange={onChange}>Image!</ImageField>
  );

  fireEvent.change(getByLabelText(/Image!/), {
    target: { files: ["Some file"] }
  });

  expect(onChange).toHaveBeenCalledWith("Some file");
});

test("responds to edit callback", async () => {
  const onChange = jest.fn();
  const { findByAltText, getByLabelText, getByText } = render(
    <ImageField name="image" onChange={onChange}>Image!</ImageField>
  );

  fireEvent.change(getByLabelText(/Image!/), { target: { files: [mockImage] } });
  await findByAltText(/Preview/);

  fireEvent.click(getByText("Save"));

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange.mock.calls[1][0] instanceof Blob).toBe(true);
});

test("handles closing the modal", () => {
  const { getByLabelText, queryByLabelText } = render(
    <ImageField name="image">Image!</ImageField>
  );

  fireEvent.change(getByLabelText(/Image!/), { target: { files: [mockImage] } });
  expect(queryByLabelText("Rotate left")).toBeTruthy();

  const overlay = document.querySelector(".ReactModal__Overlay") as HTMLElement;
  expect(overlay).not.toBe(null);

  fireEvent.click(overlay);
  expect(queryByLabelText("Rotate left")).toBeFalsy();
});

test("handles deselecting files", () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <ImageField name="image" onChange={onChange}>Image!</ImageField>
  );

  fireEvent.change(getByLabelText(/Image!/), { target: { files: [] } });
  expect(onChange).toHaveBeenLastCalledWith(null);
});

test("displays a progress bar if progress is reported", () => {
  const { queryByRole } = render(
    <ImageField name="image" progress={5}>Image!</ImageField>
  );

  expect(queryByRole("progressbar")).toBeTruthy();
});

test("accepts autoFocus", () => {
  render(<ImageField name="image" autoFocus>Image!</ImageField>);

  const imageElement = document.activeElement as HTMLImageElement;

  expect(imageElement).not.toBe(null);
  expect(imageElement.id).toEqual("image");
});
