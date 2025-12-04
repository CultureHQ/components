import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";

import ImageEditor from "../ImageEditor";
import mockImage from "../../../test/image";

let angle: number;
let zoom: number;

// Mock canvas methods that jsdom doesn't implement
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  drawImage: jest.fn()
})) as jest.Mock;

HTMLCanvasElement.prototype.toDataURL = jest.fn(() => mockImage);

const mockGetCroppedCanvas = jest.fn(() => {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;
  return canvas;
});

jest.mock("cropperjs", () => class { /* eslint-disable class-methods-use-this */
  constructor(_element: HTMLImageElement, options?: { ready?: () => void }) {
    if (options?.ready) {
      setTimeout(options.ready, 0);
    }
  }

  destroy() {}

  getCroppedCanvas() {
    return mockGetCroppedCanvas();
  }

  rotate(delta: number) {
    angle += delta;
  }

  zoom(delta: number) {
    zoom += delta;
  }
});

beforeEach(() => {
  angle = 0;
  zoom = 0;
});

test("has no violations", () => (
  expect(<ImageEditor image={mockImage} />).toHaveNoViolations()
));

test("can click rotate left to modify image", async () => {
  const { getByLabelText } = render(<ImageEditor image={mockImage} />);

  await waitFor(() => {});
  fireEvent.click(getByLabelText("Rotate left"));

  expect(angle).toEqual(-45);
});

test("can click rotate right to modify image", async () => {
  const { getByLabelText } = render(<ImageEditor image={mockImage} />);

  await waitFor(() => {});
  fireEvent.click(getByLabelText("Rotate right"));

  expect(angle).toEqual(45);
});

test("can click zoom in to modify image", async () => {
  const { getByLabelText } = render(<ImageEditor image={mockImage} />);

  await waitFor(() => {});
  fireEvent.click(getByLabelText("Zoom in"));

  expect(zoom).toEqual(0.2);
});

test("can click zoom out to modify image", async () => {
  const { getByLabelText } = render(<ImageEditor image={mockImage} />);

  await waitFor(() => {});
  fireEvent.click(getByLabelText("Zoom out"));

  expect(zoom).toEqual(-0.2);
});

test("can click save to save", async () => {
  const onEdit = jest.fn();
  const { getByText } = render(
    <ImageEditor image={mockImage} onEdit={onEdit} />
  );

  const saveButton = getByText("Save");

  // Wait for the button to be enabled (cropper is ready)
  await waitFor(() => {
    expect((saveButton as HTMLButtonElement).disabled).toBe(false);
  });

  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
