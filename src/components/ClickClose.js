import React, { useCallback, useEffect, useRef } from "react";

const useClickOutside = onClose => {
  const containerRef = useRef(null);
  const callback = useCallback(
    event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(
    () => {
      document.addEventListener("click", callback);
      return () => document.removeEventListener("click", callback);
    },
    [callback]
  );

  return containerRef;
};

const ClickClose = ({ children, component: Container = "div", onClose, ...props }) => {
  const containerRef = useClickOutside(onClose);

  return (
    <Container ref={containerRef} {...props}>
      {children}
    </Container>
  );
};

export default ClickClose;
