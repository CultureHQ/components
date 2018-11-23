---
prependJs:
- import ImageEditorContainer from "./ImageEditorContainer";
---

## `<ImageEditor>`

Edits an image. Requires that the `cropper-js` peer dependency is satisfied.

* `aspectRatio = null` - the enforced aspect ratio on the cropper
* `image` - an image object
* `onEdit` - a callback for when the image has been saved
* `onFailure` - a callback for when the image fails to load

{{
  <ImageEditorContainer />
}}
