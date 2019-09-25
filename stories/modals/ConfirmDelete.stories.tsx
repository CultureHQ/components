import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { Button, ConfirmDelete } from "../../src/components";

storiesOf("Modals/ConfirmDelete", module)
  .add("default", () => {
    const trigger = text("trigger", "Delete");
    const children = text(
      "children",
      "Are you sure you would like to delete this resource?"
    );

    const props = {
      accept: text("accept", "Delete"),
      danger: boolean("danger", true),
      onAccept: action("onAccept")
    };

    return (
      <ConfirmDelete
        {...props}
        trigger={onTrigger => (
          <Button danger onClick={onTrigger}>{trigger}</Button>
        )}
      >
        {children}
      </ConfirmDelete>
    );
  });
