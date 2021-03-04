import React from "react";

import * as iconPaths from "../icons.json";

export type IconName = keyof typeof iconPaths;

type IconProps = {
  className?: string;
  viewBox?: string;
  icon: IconName;
};

type IconState = {
  path: null | string;
};

class Icon extends React.PureComponent<IconProps, IconState> {
  private componentIsMounted = false;

  state: IconState = { path: null };

  componentDidMount(): void {
    this.componentIsMounted = true;
    this.fetchPath();
  }

  componentDidUpdate(prevProps: IconProps): void {
    const { icon } = this.props;

    if (icon !== prevProps.icon) {
      this.fetchPath();
    }
  }

  componentWillUnmount(): void {
    this.componentIsMounted = false;
  }

  fetchPath(): void {
    const { icon } = this.props;

    import("../icons.json")
      .then(icons => {
        if (this.componentIsMounted) {
          this.setState({ path: icons[icon].join(" ") });
        }
      })
      .catch(() => {
        // this catch is largely here because in the case that you're not in
        // an environment that supports dynamic import (like jest when you're
        // not compiling vendored code) it will spam the console otherwise
      });
  }

  render(): React.ReactElement {
    const { className, icon } = this.props;
    const { path } = this.state;

    let viewBox = "1024";
    switch (icon) {
      case "book":
      case "book-filled":
      case "checklist":
      case "clipboard":
      case "diamond":
      case "edit-outlined":
      case "expand":
      case "facebook":
      case "global":
      case "hammer-filled":
      case "hammer":
      case "home":
      case "home-outlined":
      case "info-thinner":
      case "image-outlined":
      case "instagram":
      case "ios-people":
      case "ios-people-outline":
      case "ios-star-outline":
      case "linkedin":
      case "mortarboard":
      case "mortarboard-filled":
      case "post":
      case "rocket":
      case "share":
      case "share-outlined":
      case "slack":
      case "snapchat":
      case "star":
      case "tale":
      case "thunder":
      case "thunder-filled":
      case "tiktok":
      case "trash-a":
      case "trash-a-outlined":
      case "twitter":
        viewBox = "512";
        break;
      case "clock-filled":
        viewBox = "16";
        break;
      default:
        break;
    }

    return (
      <svg
        aria-hidden
        role="presentation"
        width="22px"
        height="22px"
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        style={icon === "quote" ? { transform: "scaleX(-1)" } : {}}
        className={className}
      >
        {path && <path d={path} />}
      </svg>
    );
  }
}

export default Icon;
