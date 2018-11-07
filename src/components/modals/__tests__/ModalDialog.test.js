import React from "react";
import { mount } from "enzyme";
import ReactModal from "react-modal";

import ModalDialog from "../ModalDialog";

test("passes on class name", () => {
  const component = mount(<ModalDialog className="modal-dialog" />);

  expect(component.find(ReactModal).hasClass("modal-dialog")).toBe(true);
  expect(component.find(ReactModal).hasClass("chq-mdl")).toBe(true);
});

test("passes on contentRef", () => {
  const contentRef = element => {
    contentRef.current = element;
  };

  mount(<ModalDialog contentRef={contentRef} />);

  expect(contentRef.current).not.toBe(undefined);
});
