import React from "react";
import { render } from "@testing-library/react";

import ModalDialog from "../ModalDialog";

test("passes on class name", () => {
  render(<ModalDialog className="modal-dialog" />);

  expect(document.querySelector(".modal-dialog")).toBeTruthy();
});

test("passes on contentRef", () => {
  const contentRef = element => {
    contentRef.current = element;
  };

  render(<ModalDialog contentRef={contentRef} />);

  expect(contentRef.current).not.toBe(undefined);
});
