import React from "react";
import ReactDOM from "react-dom";

import /* codegen */ "./Main";

import { Modal as ModalSrc, Nav as NavSrc } from "../src/components";
import "../src/styles/app.scss";

ModalSrc.setAppElement("#main");

const Components = () => (
  <>
    <NavSrc>@culturehq/components</NavSrc>
    <Main />
    {ReactDOM.createPortal(
      <footer>
        <p>
          Copyright (c) 2018 CultureHQ
          <br />
          <a href="https://github.com/CultureHQ/components">
            github.com/CultureHQ/components
          </a>
          <br />
          <a href="https://engineering.culturehq.com">
            engineering.culturehq.com
          </a>
        </p>
      </footer>,
      document.body
    )}
  </>
);

export default Components;
