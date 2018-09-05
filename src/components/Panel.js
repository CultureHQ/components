import React from "react";

import classnames from "../classnames";
import Loader from "./Loader";

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

const PanelLoaderBody = ({ className, children, loading }) => (
  <PanelBody className={className}>
    <Loader loading={loading}>{children}</Loader>
  </PanelBody>
);

const PanelFooter = ({ className, children }) => (
  <div className={classnames("chq-pan--ft", className)}>{children}</div>
);

Object.assign(Panel, {
  Heading: PanelHeading,
  Body: PanelBody,
  LoaderBody: PanelLoaderBody,
  Footer: PanelFooter
});

export default Panel;
