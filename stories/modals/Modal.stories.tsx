import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, optionsKnob, text } from "@storybook/addon-knobs";

import { Button, Modal } from "../../src/components";

const defaultText = `
  Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that
  they were perfectly normal, thank you very much. They were the last people
  you'd expect to be involved in anything strange or mysterious, because they
  just didn't hold with such nonsense.
`;

const entranceOptions = {
  slideIn: "slideIn",
  zoomIn: "zoomIn"
} as const;

const widthOptions = {
  narrow: "narrow",
  normal: "normal"
} as const;

const config = {
  knobs: { escapeHTML: false }
};

storiesOf("Modals/Modal", module)
  .add(
    "default",
    () => {
      const texts = {
        heading: text("heading", "Chapter 1"),
        body: text("body", defaultText)
      };

      const primary = boolean("primary", false);
      const props = {
        ariaLabelledBy: "modal-title",
        ariaDescribedby: "modal-title",
        entrance: optionsKnob("entrance", entranceOptions, "slideIn", {
          display: "inline-radio"
        }),
        onClose: action("onClose"),
        startOpen: boolean("startOpen", false),
        width: optionsKnob("width", widthOptions, "normal", {
          display: "inline-radio"
        })
      };

      return (
        <Modal
          {...props}
          trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
        >
          <Modal.Heading titleId="modal-title" primary={primary}>{texts.heading}</Modal.Heading>
          <Modal.Body>{texts.body}</Modal.Body>
        </Modal>
      );
    },
    config
  )
  .add(
    "zoomIn",
    () => (
      <Modal
        entrance="zoomIn"
        trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
      >
        <Modal.Heading>Chapter 2</Modal.Heading>
        <Modal.LoaderBody loading />
      </Modal>
    ),
    config
  )
  .add(
    "narrow",
    () => (
      <Modal
        width="narrow"
        trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
      >
        <Modal.Heading>Chapter 3</Modal.Heading>
        <Modal.LoaderBody loading />
      </Modal>
    ),
    config
  )
  .add(
    "startOpen",
    () => (
      <Modal
        startOpen
        trigger={onTrigger => <Button onClick={onTrigger}>Open</Button>}
      >
        <Modal.Heading>Chapter 4</Modal.Heading>
        <Modal.LoaderBody loading />
      </Modal>
    ),
    config
  );
