import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ClickClose, PlainButton } from "../src/components";

const Container = ({ onClose: onCloseAction }: { onClose: () => void }) => {
  const [open, setOpen] = React.useState(false);
  const onOpen = () => setOpen(true);

  const onClose = React.useCallback(
    () => {
      if (open) {
        setOpen(false);
      }
      onCloseAction();
    },
    [onCloseAction, open, setOpen]
  );

  return (
    <ClickClose onClose={onClose}>
      <PlainButton onClick={onOpen}>
        Click me!
      </PlainButton>
      {open && <div>Open!</div>}
    </ClickClose>
  );
};

storiesOf("ClickClose", module)
  .add("default", () => {
    const props = {
      onClose: action("onClose")
    };

    return <Container {...props} />;
  });
