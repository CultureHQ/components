import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";

import { Pagination } from "../src/components";

storiesOf("Pagination", module)
  .add("default", () => {
    const props = {
      currentPage: number("currentPage", 1),
      onClick: action("onClick"),
      totalPages: number("totalPages", 16)
    };

    return <Pagination {...props} />;
  })
  .add("2 pages", () => (
    <Pagination currentPage={1} totalPages={2} onClick={action("onClick")} />
  ))
  .add("4 pages", () => (
    <Pagination currentPage={1} totalPages={4} onClick={action("onClick")} />
  ))
  .add("8 pages", () => (
    <Pagination currentPage={1} totalPages={8} onClick={action("onClick")} />
  ));
