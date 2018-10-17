import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { axe, toHaveNoViolations } from "jest-axe";

import { ModalDialog } from "../src";

configure({ adapter: new Adapter() });

expect.extend({
  async toHaveNoViolations(jsx) {
    const component = mount(jsx);
    const assessment = await axe(component.html());

    const response = toHaveNoViolations.toHaveNoViolations(assessment);
    component.unmount();

    return response;
  }
});

ModalDialog.setAppElement(document.body);

URL.createObjectURL = object => `blob:${object}`;
URL.revokeObjectURL = () => {};
