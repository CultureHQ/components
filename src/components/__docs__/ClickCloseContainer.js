import React, { useCallback, useState } from "react";

import ClickClose from "../ClickClose";
import PlainButton from "../buttons/PlainButton";

const ClickCloseContainer = () => {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => open && setOpen(false), [open, setOpen]);
  const onOpen = useCallback(() => setOpen(true), [setOpen]);

  return (
    <ClickClose onClose={onClose}>
      <PlainButton onClick={onOpen}>
        Click me!
      </PlainButton>
      {open && <div>Open!</div>}
    </ClickClose>
  );
};

export default ClickCloseContainer;
