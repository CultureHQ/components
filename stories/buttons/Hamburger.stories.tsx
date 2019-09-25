import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";

import { Hamburger } from "../../src/components";

const Container = (props: React.ComponentProps<typeof Hamburger>) => (
  <div style={{ backgroundColor: "#2c3e4f", display: "inline-block" }}>
    <Hamburger {...props} />
  </div>
);

storiesOf("Buttons/Hamburger", module)
  .add("default", () => {
    const props = {
      onToggle: action("onToggle"),
      open: boolean("open", false)
    };

    return <Container {...props} />;
  })
  .add("open", () => <Container open onToggle={() => {}} />);
