import React from "react";
import { render } from "@testing-library/react";

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

  const { findByRole, getByRole, queryByRole } = render(
    <ImagePreview image={image} preview="culture.png" />
  );

  expect(queryByRole("img")).toBeFalsy();
  await findByRole("img");

  expect(getByRole("img").style).toHaveProperty("height", "200px");
});

test("does not attempt to set state when unmounted while waiting", async () => {
  jest.spyOn(readImage, "default").mockImplementation(() => new Promise(resolve => {
    setTimeout(() => resolve(resolved), 200);
  }));

  const { findByRole, queryByRole, unmount } = render(
    <ImagePreview image={image} preview="culture.png" />
  );

  expect(queryByRole("img")).toBeFalsy();
  await findByRole("img");

  unmount();
});
