import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { axe, toHaveNoViolations } from "jest-axe";

import { ModalDialog } from "../src";

configure({ adapter: new Adapter() });

expect.extend({
  async toHaveNoViolations(jsx) {
    const assessment = await axe(mount(jsx).html());
    return toHaveNoViolations.toHaveNoViolations(assessment);
  }
});

ModalDialog.setAppElement(document.body);
