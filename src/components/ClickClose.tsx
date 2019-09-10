import * as React from "react";
import { useClickOutside } from "@culturehq/hooks";

type ClickCloseProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  onClose: () => void;
};

const ClickClose = ({ children, onClose, ...props }: ClickCloseProps) => {
  const containerRef = useClickOutside<HTMLDivElement>(onClose);

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
};

export default ClickClose;
