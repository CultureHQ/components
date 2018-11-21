---
prependJs:
- import { ActionButton } from "../../../src";
- import { onClick } from "../utils";
---

## `<ActionButton>`

A button that represents the user taking an action.

* `children` - displayed inside the button
* `className?` - an extra class name
* `icon?` - an icon to display inside the button
* `onClick?` - a click handler

{{
  <ActionButton onClick={onClick}>Default</ActionButton>{" "}
  <ActionButton icon="clipboard" onClick={onClick}>Icon</ActionButton>
}}
