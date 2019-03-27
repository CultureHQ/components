import React from "react";
import { storiesOf } from "@storybook/react";

import { ImagePreview, Panel } from "../src/components";

storiesOf("ImagePreview", module)
  .add("default", () => (
    <Panel>
      <Panel.Body className="min-height">
        <ImagePreview preview="culture.png" />
      </Panel.Body>
    </Panel>
  ));
