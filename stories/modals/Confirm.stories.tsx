import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";

import { BooleanField, Button, Confirm } from "../../src/components";

storiesOf("Modals/Confirm", module)
  .add("default", () => {
    const trigger = text("trigger", "Create");
    const children = text(
      "children",
      "Are you sure you would like to create this resource?"
    );

    const props = {
      accept: text("accept", "Yes"),
      danger: boolean("danger", false),
      onAccept: action("onAccept"),
      onCancel: action("onCanceled")
    };

    return (
      <Confirm
        {...props}
        trigger={onTrigger => <Button onClick={onTrigger}>{trigger}</Button>}
      >
        {children}
      </Confirm>
    );
  })
  .add("danger", () => (
    <Confirm
      danger
      onAccept={action("onAccept")}
      trigger={onTrigger => <Button danger onClick={onTrigger}>Delete</Button>}
    >
      Are you sure you would like to delete this resource?
    </Confirm>
  ))
  .add("disclaimer", () => {
    const trigger = text("trigger", "Create");
    const children = text(
      "children",
      "Are you sure you would like to create this resource?"
    );

    const props = {
      accept: text("accept", "Yes"),
      danger: boolean("danger", false),
      onAccept: action("onAccept")
    };

    return (
      <Confirm
        {...props}
        trigger={onTrigger => <Button onClick={onTrigger}>{trigger}</Button>}
        disclaimer={(
          <BooleanField
            name="boolean"
            onChange={() => {}}
            value
          >
            <span>Do not show this again</span>
          </BooleanField>
        )}
      >
        {children}
      </Confirm>
    );
  });
