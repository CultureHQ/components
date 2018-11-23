---
prependJs:
- import ImagePreview from "../ImagePreview";
- import Panel from "../Panel";
---

## `<ImagePreview>`

A preview of an image file. Used to preview files before they are uploaded.

* `image` - the file object used to contain the image
* `preview` - a URL representing the file (usually obtained through `URL.createObjectURL`)

{{
  <Panel>
    <Panel.Body className="min-height">
      <ImagePreview preview="culture.png" />
    </Panel.Body>
  </Panel>
}}
