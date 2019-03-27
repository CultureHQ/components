import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import { Panel } from "../src/components";

storiesOf("Panel", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const limitWidth = boolean("limitWidth", false);
    const primary = boolean("primary", false);

    const texts = {
      heading: text("heading", "Heading"),
      body: text("body", "This is the body of the panel."),
      footer: text("footer", "Footer")
    };

    return (
      <Panel limitWidth={limitWidth}>
        <Panel.Heading primary={primary}>{texts.heading}</Panel.Heading>
        <Panel.Body>{texts.body}</Panel.Body>
        <Panel.Footer>{texts.footer}</Panel.Footer>
      </Panel>
    );
  })
  .add("primary", () => (
    <Panel>
      <Panel.Heading primary>Primary Heading</Panel.Heading>
      <Panel.Body>Body</Panel.Body>
    </Panel>
  ))
  .add("limitWidth", () => (
    <Panel limitWidth>
      <Panel.Body>A limited width panel.</Panel.Body>
    </Panel>
  ));
