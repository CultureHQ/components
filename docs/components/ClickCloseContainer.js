import React, { useCallback, useState } from "react";

import { ClickClose, PlainButton } from "../../src";

const ClickCloseContainer = () => {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => open && setOpen(false));
  const onOpen = useCallback(() => setOpen(true));

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
