import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { date } from "@storybook/addon-knobs";

import { Calendar } from "../src/components";

storiesOf("Calendar", module)
  .add("default", () => {
    const props = {
      value: date("value", null),
      onChange: action("onChange")
    };

    return <Calendar {...props} />;
  });
