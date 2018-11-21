---
prependJs:
- import { FeedItem } from "../../../src";
---

## `<FeedItem>`

A contained item in a feed.

* `children` - sections of the item, usually `FeedItem.Body` and `FeedItem.Footer` components
* `className?` - an extra class name

### `<FeedItem.Body>`

* `children` - displayed inside the body
* `className?` - an extra class name

### `<FeedItem.Footer>`

* `children` - displayed inside the footer
* `className?` - an extra class name

{{
  <FeedItem>
    <FeedItem.Body>This is a feed item.</FeedItem.Body>
    <FeedItem.Footer>This is the footer of the feed item.</FeedItem.Footer>
  </FeedItem>
}}
