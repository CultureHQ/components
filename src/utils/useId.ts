import { useState } from "react";

// This hook exists because accessibility APIs rely heavily on IDs for linking
// up components. For example, the only way to properly use `aria-labelledby` is
// to pass it the ID of a component on the page. However, you can't just put a
// static ID in case there are multiple instances on the page. So, we can just
// store a module-level variable that increments that you can then use with a
// useState hook to keep track.

let currentId = 0;
const generateId = () => {
  currentId += 1;
  return `chq-${currentId}`;
};

const useId = () => {
  const [id, _setId] = useState(generateId);
  return id;
};

export default useId;
