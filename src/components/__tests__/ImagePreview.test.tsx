import * as React from "react";
import { render, waitForDomChange } from "@testing-library/react";

import ImagePreview from "../ImagePreview";

/* eslint-disable no-import-assign */
import * as readImage from "../../utils/readImage";
import image from "../../../test/image";

const resolved = {
  src: "culturehq.png",
  styles: {
    left: "0px",
    height: 200,
    width: 200
  }
};

test("reads image and loads it", async () => {
  jest.spyOn(readImage, "default").mockImplementation(() => Promise.resolve(resolved));

  const { container, getByRole, queryByRole } = render(
    <ImagePreview image={image} preview="culture.png" />
  );

  expect(queryByRole("img")).toBeFalsy();

  await waitForDomChange({ container });

  expect(queryByRole("img")).toBeTruthy();
  expect(getByRole("img").style).toHaveProperty("height", "200px");
});

test("does not attempt to set state when unmounted while waiting", () => {
  jest.spyOn(readImage, "default").mockImplementation(() => new Promise(resolve => (
    setTimeout(() => resolve(resolved), 200)
  )));

  const { container, queryByRole, unmount } = render(
    <ImagePreview image={image} preview="culture.png" />
  );

  expect(queryByRole("img")).toBeFalsy();

  return waitForDomChange({ container }).then(() => {
    unmount();
  });
});
