import * as React from "react";

import classnames from "../classnames";
import { OptionalContainerProps } from "../typings";

import Loader from "./Loader";

type PanelProps = OptionalContainerProps & React.HTMLAttributes<HTMLDivElement> & {
  limitWidth?: boolean;
};

const Panel = ({ className, children, limitWidth = false, ...props }: PanelProps) => (
  <div {...props} className={classnames("chq-pan", className, { "chq-pan-lim": limitWidth })}>
    {children}
  </div>
);

type PanelHeadingProps = OptionalContainerProps & {
  primary?: boolean;
};

const PanelHeading = ({ className, children, primary = false }: PanelHeadingProps) => (
  <div className={classnames("chq-pan--hd", className, { "chq-pan--hd-pr": primary })}>
    <h2>{children}</h2>
    <hr />
  </div>
);

const PanelBody = ({ className, children }: OptionalContainerProps) => (
  <div className={classnames("chq-pan--bd", className)}>{children}</div>
);

type PanelLoaderBodyProps = OptionalContainerProps & {
  loading: boolean;
};

const PanelLoaderBody = ({ className, children, loading }: PanelLoaderBodyProps) => (
  <PanelBody className={className}>
    <Loader loading={loading}>{children}</Loader>
  </PanelBody>
);

const PanelFooter = ({ className, children }: OptionalContainerProps) => (
  <div className={classnames("chq-pan--ft", className)}>{children}</div>
);

Panel.Heading = PanelHeading;
Panel.Body = PanelBody;
Panel.LoaderBody = PanelLoaderBody;
Panel.Footer = PanelFooter;

export default Panel;
