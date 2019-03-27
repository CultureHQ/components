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
  .add("2 pages", () => <Pagination totalPages={2} />)
  .add("4 pages", () => <Pagination totalPages={4} />)
  .add("8 pages", () => <Pagination totalPages={8} />);
