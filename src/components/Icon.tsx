import * as React from "react";

type IconProps = {
  className?: string;
  icon: string;
};

const isKeyOf = <T extends object>(object: T, key: keyof any): key is keyof T => key in object;

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

          if (isKeyOf(icons, icon)) {
            setD(icons[icon].join(" "));
          } else {
            throw new Error(`Invalid icon: ${icon}`);
          }
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
