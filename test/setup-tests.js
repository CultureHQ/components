import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { ModalDialog } from "../src";

configure({ adapter: new Adapter() });

ModalDialog.setAppElement(document.body);
