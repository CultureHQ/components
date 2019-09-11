import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ImageEditor, Panel } from "../src/components";

const image = require("./public/culture.png");

storiesOf("ImageEditor", module)
  .add("default", () => {
    const props = {
      onEdit: action("onEdit")
    };

    return (
      <Panel>
        <Panel.Body>
          <ImageEditor image={image} {...props} />
        </Panel.Body>
      </Panel>
    );
  });
