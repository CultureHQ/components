---
prependJs:
- import Thumbnail from "../Thumbnail";
---

## `<Thumbnail>`

A small image that should be displayed inline.

* `className?` - an extra class name
* `image` - the image to be displayed
* `size = "small"` - can be one of `small`, `medium`, or `large`
* `square = false` - whether or not this image should be displayed as a square
* `title?` - an optional title for the image

{{
  <div>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(ident => (
      <Thumbnail
        key={ident}
        image={`https://robohash.org/${ident}`}
        title={`Robot ${ident}`}
        size={["small", "medium", "large"][Math.floor(ident / 4)]}
        square={Math.floor(ident % 4) >= 2}
      />
    ))}
  </div>
}}
