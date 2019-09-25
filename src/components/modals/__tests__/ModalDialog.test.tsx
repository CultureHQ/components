import React from "react";
import { render } from "@testing-library/react";

import ModalDialog from "../ModalDialog";

test("passes on class name", () => {
  render(<ModalDialog className="modal-dialog">Dialog!</ModalDialog>);

  expect(document.querySelector(".modal-dialog")).toBeTruthy();
});

test("passes on contentRef", () => {
  let content: null | HTMLDivElement = null;
  const contentRef = (element: HTMLDivElement) => {
    content = element;
  };

  render(<ModalDialog contentRef={contentRef}>Dialog!</ModalDialog>);

  expect(content).not.toBe(null);
});
