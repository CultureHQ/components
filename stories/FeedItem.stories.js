import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import { FeedItem } from "../src/components";

storiesOf("FeedItem", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const texts = {
      body: text("body", "This is a feed item."),
      footer: text("footer", "This is the footer of a feed item.")
    };

    return (
      <FeedItem>
        <FeedItem.Body>{texts.body}</FeedItem.Body>
        <FeedItem.Footer>{texts.footer}</FeedItem.Footer>
      </FeedItem>
    );
  });
