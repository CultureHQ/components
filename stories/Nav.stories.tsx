import * as React from "react";
import { storiesOf } from "@storybook/react";

import { Nav } from "../src/components";

const Container = () => (
  <>
    <Nav>
      <span style={{ fontSize: "1.5em", lineHeight: "1.75em" }}>
        @culturehq/components
      </span>
    </Nav>
    <div style={{ height: "1000px" }} />
  </>
);

storiesOf("Nav", module).add("default", () => <Container />);
