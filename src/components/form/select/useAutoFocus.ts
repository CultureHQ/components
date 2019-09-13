import * as React from "react";

const useAutoFocus = <T extends HTMLElement>(autoFocus: boolean, elementRef: React.RefObject<T>) => {
  const onFocus = React.useCallback(
    () => {
      const element = elementRef.current;

      if (element) {
        element.focus();
      }
    },
    [elementRef]
  );

  React.useEffect(
    () => {
      if (autoFocus) {
        onFocus();
      }
    },
    [autoFocus, onFocus]
  );

  return onFocus;
};

export default useAutoFocus;
