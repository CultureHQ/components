import React from "react";

import classnames from "../classnames";
import Tooltip from "./Tooltip";

export const COLORS = {
  darkblue: "db",
  green: "gr",
  lightblue: "lb",
  yellow: "yw"
};

const CheerSVG = ({ className, color = "darkblue", pop }) => (
  <svg
    className={classnames("chq-chr", className, `chq-chr-${COLORS[color]}`, { "chq-chr-pp": pop } )}
    viewBox="0 0 344 512"
  >
    <path d="m331 25c-11-9-27-8-36 3l-88 104c-4 4-9 7-16 7l-40 0c-5 0-12-3-16-7l-88-104c-9-11-25-12-36-3-11 9-12 25-3 36l100 120 0 143 0 8 0 152c0 15 12 25 25 25 15 0 25-12 25-25l0-152 20 0 0 152c0 15 12 25 25 25 15 0 25-12 25-25l0-152 0-8 0-143 100-120c9-11 8-26 2-37z"/>
    <circle r="55" cy="60" cx="171" />

    <circle className="chq-chr--fb chq-chr--fb-1" r="40" cy="0" cx="-24" />
    <circle className="chq-chr--fb chq-chr--fb-7" r="40" cy="0" cx="364" />
    <circle className="chq-chr--fb chq-chr--fb-2" r="40" cy="-54" cx="31" />
    <circle className="chq-chr--fb chq-chr--fb-6" r="40" cy="-54" cx="309" />
    <circle className="chq-chr--fb chq-chr--fb-3" r="40" cy="-86" cx="96" />
    <circle className="chq-chr--fb chq-chr--fb-5" r="40" cy="-86" cx="244" />
    <circle className="chq-chr--fb chq-chr--fb-4" r="40" cy="-101" cx="170" />
  </svg>
);

const Cheer = ({ name, ...props }) => {
  if (name) {
    return <Tooltip tip={name}><CheerSVG {...props} /></Tooltip>;
  }

  return <CheerSVG {...props} />;
};

export default Cheer;
