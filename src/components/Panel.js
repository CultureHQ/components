import React from "react";

import classnames from "../classnames";

const Panel = ({ className, children }) => (
  <div className={classnames("chq-pan", className)}>{children}</div>
);

const PanelHeading = ({ className, children }) => (
  <div className={classnames("chq-pan--hd", className)}>
    <h2>{children}</h2>
    <hr />
  </div>
);

const PanelBody = ({ className, children }) => (
  <div className={classnames("chq-pan--bd", className)}>{children}</div>
);

const PanelFooter = ({ className, children }) => (
  <div className={classnames("chq-pan--ft", className)}>{children}</div>
);

Object.assign(Panel, {
  Heading: PanelHeading,
  Body: PanelBody,
  Footer: PanelFooter
});

export default Panel;
