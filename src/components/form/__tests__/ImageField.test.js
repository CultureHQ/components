import React from "react";
import { fireEvent, render, waitForElement } from "@testing-library/react";

import ImageField from "../ImageField";
import mockImage from "../../__tests__/__mocks__/image";

jest.mock("cropperjs", () => class {
  destroy() {} // eslint-disable-line class-methods-use-this

  getCroppedCanvas() { // eslint-disable-line class-methods-use-this
    return { toDataURL: () => mockImage };
  }
});

test("has no violations", () => (
  expect(<ImageField name="image" />).toHaveNoViolations()
));

test("calls up to callbacks if they are provided", () => {
  const onChange = jest.fn();
  const { getByRole } = render(<ImageField name="image" onChange={onChange} />);

  fireEvent.change(getByRole("textbox"), {
    target: { files: ["Some file"] }
  });

  expect(onChange).toHaveBeenCalledWith("Some file");
});

test("responds to edit callback", async () => {
  const onChange = jest.fn();
  const { container, getByAltText, getByRole, getByText } = render(
    <ImageField name="image" onChange={onChange} />
  );

  fireEvent.change(getByRole("textbox"), { target: { files: [mockImage] } });
  await waitForElement(() => getByAltText(/Preview/), { container });

  fireEvent.click(getByText("Save"));

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange.mock.calls[1][0] instanceof Blob).toBe(true);
});

test("handles closing the modal", () => {
  const { getByRole, queryByLabelText } = render(
    <ImageField name="image" />
  );

  fireEvent.change(getByRole("textbox"), { target: { files: [mockImage] } });
  expect(queryByLabelText("Rotate left")).toBeTruthy();

  fireEvent.click(document.querySelector(".ReactModal__Overlay"));
  expect(queryByLabelText("Rotate left")).toBeFalsy();
});

test("handles deselecting files", () => {
  const onChange = jest.fn();
  const { getByRole } = render(<ImageField name="image" onChange={onChange} />);

  fireEvent.change(getByRole("textbox"), { target: { files: [] } });
  expect(onChange).toHaveBeenLastCalledWith(null);
});

test("displays a progress bar if progress is reported", () => {
  const { queryByRole } = render(<ImageField name="image" progress={5} />);

  expect(queryByRole("progressbar")).toBeTruthy();
});

test("accepts autoFocus", () => {
  render(<ImageField name="image" autoFocus />);

  expect(document.activeElement.id).toEqual("image");
});
