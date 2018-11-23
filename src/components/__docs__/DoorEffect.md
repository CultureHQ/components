---
prependJs:
- import DoorEffectContainer from "./DoorEffectContainer";
---

## `<DoorEffect>`

A component that wraps something that can be open and closed. When triggered to open with the `open` prop, it will add `"{className}-open"` to the wrapping component, and when closed it will add `"{className}-closed"` to the wrapping component. This allows for the common pattern of a CSS animation, and then reversing the direction on close.

* `className?` - an extra class name
* `duration = 150` - how long the animation lasts (in ms)
* `open = false` - whether or not the component is currently open
* `tag = "div"` - the tag type for the container

{{
  <DoorEffectContainer />
}}
