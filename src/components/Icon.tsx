import * as React from "react";

import * as iconPaths from "../icons.json";

export type IconName = keyof typeof iconPaths;

type IconProps = {
  className?: string;
  icon: IconName;
};

const Icon = ({ className, icon }: IconProps) => {
  const [d, setD] = React.useState<null | string>(null);

  React.useEffect(
    () => {
      let cancelled = false;

      import("../icons.json")
        .then(icons => {
          if (cancelled) {
            return;
          }

          setD(icons[icon].join(" "));
        })
        .catch(() => {
          // this catch is largely here because in the case that you're not in
          // an environment that supports dynamic import (like jest when you're
          // not compiling vendored code) it will spam the console otherwise
        });

      return () => {
        cancelled = true;
      };
    },
    [icon, setD]
  );

  return (
    <svg
      aria-hidden
      role="presentation"
      width="22px"
      height="22px"
      viewBox="0 0 1024 1024"
      className={className}
    >
      {d && <path d={d} />}
    </svg>
  );
};

export default Icon;
