import * as React from "react";

type OptionalClassName = {
  className?: string;
};

export type ContainerProps = OptionalClassName & {
  children: React.ReactNode;
};

export type OptionalContainerProps = OptionalClassName & {
  children?: React.ReactNode;
};
