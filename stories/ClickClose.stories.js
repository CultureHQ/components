import React, { useCallback, useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, optionsKnob } from "@storybook/addon-knobs";

import { ClickClose, PlainButton } from "../src/components";

const Container = ({ onClose: onCloseAction, ...props }) => {
  const [open, setOpen] = useState(false);
  const onOpen = useCallback(() => setOpen(true), [setOpen]);

  const onClose = useCallback(
    () => {
      if (open) {
        setOpen(false);
      }
      onCloseAction();
    },
    [open, setOpen]
  );

  return (
    <ClickClose onClose={onClose} {...props}>
      <PlainButton onClick={onOpen}>
        Click me!
      </PlainButton>
      {open && <div>Open!</div>}
    </ClickClose>
  );
};

const componentOptions = {
  div: "div",
  strong: "strong",
  em: "em"
};

storiesOf("ClickClose", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const props = {
      component: optionsKnob("component", componentOptions, "div", {
        display: "inline-radio"
      }),
      onClose: action("onClose")
    };

    return <Container {...props} />;
  })
  .add("strong", () => <Container component="strong" />);
