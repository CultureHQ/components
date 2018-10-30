import React, { useState } from "react";

import { ClickClose, PlainButton } from "../../src";

const ClickCloseContainer = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => open && setOpen(false);
  const onOpen = () => setOpen(true);

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
