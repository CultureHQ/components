import React from "react";

import classnames from "../classnames";

import Loader from "./Loader";

type Container = {
  children?: React.ReactNode;
  className?: string;
  style?: any;
};

type PanelHeadingProps = Container & {
  primary?: boolean;
  titleId?: string;
};

const PanelHeading: React.FC<PanelHeadingProps> = ({
  className,
  children,
  primary = false,
  titleId
}) => (
  <div className={classnames("chq-pan--hd", className, { "chq-pan--hd-pr": primary })}>
    <h2 id={titleId}>{children}</h2>
    <hr />
  </div>
);

type PanelBodyProps = Container;

const PanelBody: React.FC<PanelBodyProps> = ({ className, children, style }) => (
  <div className={classnames("chq-pan--bd", className)} style={style}>{children}</div>
);

type PanelLoaderBodyProps = Container & {
  loading: boolean;
};

const PanelLoaderBody: React.FC<PanelLoaderBodyProps> = ({
  className, children, loading, style
}) => (
  <PanelBody className={className} style={style}>
    <Loader loading={loading}>{children}</Loader>
  </PanelBody>
);

type PanelFooterProps = Container;

const PanelFooter: React.FC<PanelFooterProps> = ({ className, children }) => (
  <div className={classnames("chq-pan--ft", className)}>{children}</div>
);

type PanelProps = React.HTMLAttributes<HTMLDivElement> & Container & {
  limitWidth?: boolean;
};

type PanelComponent = React.FC<PanelProps> & {
  Heading: typeof PanelHeading;
  Body: typeof PanelBody;
  LoaderBody: typeof PanelLoaderBody;
  Footer: typeof PanelFooter;
};

const Panel: PanelComponent = ({ className, children, limitWidth = false, ...props }) => (
  <div {...props} className={classnames("chq-pan", className, { "chq-pan-lim": limitWidth })}>
    {children}
  </div>
);

Panel.Heading = PanelHeading;
Panel.Body = PanelBody;
Panel.LoaderBody = PanelLoaderBody;
Panel.Footer = PanelFooter;

export default Panel;
