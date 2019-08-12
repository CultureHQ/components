import React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import ImagePreview from "../ImagePreview";
import * as readImage from "../../utils/readImage";

test("reads image and loads it", async () => {
  readImage.default = jest.fn(() => Promise.resolve({
    src: "culturehq.png",
    styles: { height: "200px" }
  }));

  const { container, queryByRole } = render(<ImagePreview preview="culture.png" />);
  expect(queryByRole("img")).toBeFalsy();

  await waitForDomChange({ container });

  expect(queryByRole("img")).toBeTruthy();
  expect(queryByRole("img").style).toHaveProperty("height", "200px");
});

test("does not attempt to set state when unmounted while waiting", () => {
  readImage.default = jest.fn(() => new Promise(resolve => (
    setTimeout(() => resolve({ src: "culturehq.png", styles: { height: "200px" } }), 200)
  )));

  const { container, queryByRole, unmount } = render(
    <ImagePreview preview="culture.png" />
  );

  expect(queryByRole("img")).toBeFalsy();

  return waitForDomChange({ container }).then(() => {
    unmount();
  });
});
