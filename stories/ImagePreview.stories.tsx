import * as React from "react";
import { storiesOf } from "@storybook/react";

import { ImagePreview, Panel } from "../src/components";

const image = require("./public/culture.png");

storiesOf("ImagePreview", module)
  .add("default", () => (
    <Panel>
      <Panel.Body className="min-height">
        <ImagePreview image={image} preview="culture.png" />
      </Panel.Body>
    </Panel>
  ));
