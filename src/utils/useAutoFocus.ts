import React, { useCallback, useEffect } from "react";

const useAutoFocus = <T extends HTMLElement>(
  autoFocus: boolean | undefined,
  elementRef: React.RefObject<T>
) => {
  const onFocus = useCallback(
    () => {
      const element = elementRef.current;

      if (element) {
        element.focus();
      }
    },
    [elementRef]
  );

  useEffect(
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
