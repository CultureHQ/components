import React from "react";
import { storiesOf } from "@storybook/react";

import { Icon, Tooltip } from "../src/components";
import { IconName } from "../src/components/Icon";

import icons from "../src/icons.json";

storiesOf("Icon", module)
  .add("default", () => (
    <div style={{ padding: "3em" }}>
      {Object.keys(icons).map(key => {
        const icon = key as IconName;

        return (
          <>
            <Tooltip tip={icon}>
              <Icon icon={icon} />
            </Tooltip>
            {" "}
          </>
        );
      })}
    </div>
  ));
