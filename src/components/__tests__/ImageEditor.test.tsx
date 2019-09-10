import * as React from "react";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";

import ImageEditor from "../ImageEditor";

// eslint-disable-next-line jest/no-mocks-import
import mockImage from "./__mocks__/image";

let angle;
let zoom;

/* eslint-disable class-methods-use-this */
jest.mock("cropperjs", () => class {
  destroy() {}

  getCroppedCanvas() {
    return { toDataURL: () => mockImage };
  }

  rotate(delta) {
    angle += delta;
  }

  zoom(delta) {
    zoom += delta;
  }
});
/* eslint-enable class-methods-use-this */

beforeEach(() => {
  angle = 0;
  zoom = 0;
});

test("has no violations", () => (
  expect(<ImageEditor image={mockImage} />).toHaveNoViolations()
));

test("can click rotate left to modify image", async () => {
  const { container, getByLabelText } = render(
    <ImageEditor image={mockImage} />
  );

  await waitForDomChange({ container });
  fireEvent.click(getByLabelText("Rotate left"));

  expect(angle).toEqual(-45);
});

test("can click rotate right to modify image", async () => {
  const { container, getByLabelText } = render(
    <ImageEditor image={mockImage} />
  );

  await waitForDomChange({ container });
  fireEvent.click(getByLabelText("Rotate right"));

  expect(angle).toEqual(45);
});

test("can click zoom in to modify image", async () => {
  const { container, getByLabelText } = render(
    <ImageEditor image={mockImage} />
  );

  await waitForDomChange({ container });
  fireEvent.click(getByLabelText("Zoom in"));

  expect(zoom).toEqual(0.2);
});

test("can click zoom out to modify image", async () => {
  const { container, getByLabelText } = render(
    <ImageEditor image={mockImage} />
  );

  await waitForDomChange({ container });
  fireEvent.click(getByLabelText("Zoom out"));

  expect(zoom).toEqual(-0.2);
});

test("can click save to save", async () => {
  const onEdit = jest.fn();
  const { container, getByText } = render(
    <ImageEditor image={mockImage} onEdit={onEdit} />
  );

  await waitForDomChange({ container });
  fireEvent.click(getByText("Save"));

  expect(onEdit).toHaveBeenCalledTimes(1);
});
