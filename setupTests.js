/* eslint-disable import/no-extraneous-dependencies */
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { ModalDialog } from "./src/components";

expect.extend({
  async toHaveNoViolations(jsx) {
    const assessment = await axe(render(jsx).container);
    return toHaveNoViolations.toHaveNoViolations(assessment);
  }
});

URL.createObjectURL = object => object;
URL.revokeObjectURL = () => {};

window.requestAnimationFrame = callback => callback();
window.cancelAnimationFrame = () => {};
