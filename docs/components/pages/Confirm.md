---
prependJs:
- import { Button, Confirm } from "../../../src";
---

## `<Confirm>`

A confirmation dialog. It has the same props as the `Modal` component below, in addition to:

* `accept = "Yes"` - the text used for the accept button
* `danger = false` - indicates that the acception action is permanent
* `onAccept` - a callback when the action has been accepted

{{
  <Confirm
    accept="Yes, create it!"
    onAccept={() => new Promise(resolve => setTimeout(resolve, 1000))}
    trigger={onTrigger => <Button onClick={onTrigger}>Create</Button>}
  >
    Are you sure you&#39;d like to create this resource?
  </Confirm>
}}
