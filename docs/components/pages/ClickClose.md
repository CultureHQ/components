---
prependJs:
- import ClickCloseContainer from "../ClickCloseContainer";
---

## `<ClickClose>`

A component for closing something when a click event occurs outside the component.

* `children` - the inside of the listener
* `className?` - an extra class name
* `component = "div"` - the component used to wrap the children
* `onClose` - the callback for when the click event occurs

{{
  <ClickCloseContainer />
}}
