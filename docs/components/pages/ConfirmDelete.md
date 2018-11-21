---
prependJs:
- import { Button, ConfirmDelete } from "../../../src";
---

## `<ConfirmDelete>`

A variation of a `Confirm` that is marked as dangerous with a `Delete` button by default. Accepts all of the same props as `Confirm`.

{{
  <ConfirmDelete
    onAccept={() => new Promise(resolve => setTimeout(resolve, 1000))}
    trigger={onTrigger => <Button danger onClick={onTrigger}>Danger</Button>}
  >
    Are you sure you&#39;d like to delete this resource?
  </ConfirmDelete>
}}
