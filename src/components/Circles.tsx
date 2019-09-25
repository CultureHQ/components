import React from "react";

import classnames from "../classnames";

type CirclesProps = {
  className?: string;
};

const Circles: React.FC<CirclesProps> = ({ className }) => (
  <svg className={classnames("chq-cir", className)} viewBox="0 0 300 300">
    <circle
      className="chq-cir--sm"
      r="16"
      cx="124"
      cy="42"
      fill="#fbce49"
      fillOpacity="0.85"
    />
    <circle
      className="chq-cir--bl"
      r="72"
      cx="98"
      cy="134"
      fill="#76a6d6"
      fillOpacity="0.85"
    />
    <circle
      className="chq-cir--yl"
      r="72"
      cx="202"
      cy="96"
      fill="#fbce49"
      fillOpacity="0.85"
    />
    <circle
      className="chq-cir--gr"
      r="72"
      cx="186"
      cy="200"
      fill="#77ae7b"
      fillOpacity="0.85"
    />
  </svg>
);

export default Circles;
