import React from "react";
import { useClickOutside } from "@culturehq/hooks";

type ClickCloseProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  onClose: () => void;
};

const ClickClose: React.FC<ClickCloseProps> = ({ children, onClose, ...props }) => {
  const containerRef = useClickOutside<HTMLDivElement>(onClose);

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
};

export default ClickClose;
