import React from "react";
import { storiesOf } from "@storybook/react";

import { Icon, Tooltip } from "../src/components";
import icons from "../src/icons.json";

storiesOf("Icon", module)
  .add("default", () => (
    <div style={{ padding: "3em" }}>
      {Object.keys(icons).map(icon => (
        <>
          <Tooltip tip={icon}>
            <Icon icon={icon} />
          </Tooltip>
          {" "}
        </>
      ))}
    </div>
  ));
