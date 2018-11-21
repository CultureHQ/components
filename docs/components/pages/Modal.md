---
prependJs:
- import { Button, Modal } from "../../../src";
- import { TEXT } from "../utils";
---

## `<Modal>`

A wrapper around `ModalDialog` that maintains the state of whether or not the dialog is currently open. It provides a `trigger` render function that allows the consumer to define how it gets triggered.

This component has the same subcomponents as the `Panel` component, just namespaced under the `Modal` component, e.g., `Modal.Heading`. It has the same props as the `ModalDialog` component, in addition to:

* `onClose` - called when the modal is closed
* `startOpen = false` - indicates that the dialog should be open when rendered
* `trigger` - a function that accepts as one argument an `onTrigger` function and returns a valid React component.

{{
  <Modal
    entrance="slideIn"
    trigger={onTrigger => <Button onClick={onTrigger}>slideIn modal</Button>}
  >
    <Modal.Heading>Chapter 1</Modal.Heading>
    <Modal.Body>{TEXT}</Modal.Body>
  </Modal>
  {" "}
  <Modal
    entrance="zoomIn"
    trigger={onTrigger => <Button onClick={onTrigger}>zoomIn modal</Button>}
  >
    <Modal.Heading>Chapter 2</Modal.Heading>
    <Modal.LoaderBody loading />
  </Modal>
  {" "}
  <Modal
    trigger={onTrigger => <Button onClick={onTrigger}>narrow modal</Button>}
    width="narrow"
  >
    <Modal.Heading>Chapter 3</Modal.Heading>
    <Modal.LoaderBody loading />
  </Modal>
}}
