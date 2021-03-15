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
    const transform = icon === "user-filled" ? 40 : 0;

    let viewBox = "1024";
    switch (icon) {
      case "book":
      case "book-filled":
      case "checklist":
      case "clipboard":
      case "diamond":
      case "diamond-filled":
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
      case "link-wider":
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
      case "user-filled":
        viewBox = "512";
        break;
      case "clock-filled":
        viewBox = "16";
        break;
      default:
        break;
    }

    if (icon === "diamond-filled") {
      return (
        <svg
          aria-hidden
          role="presentation"
          width="22px"
          height="22px"
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          x="0px"
          y="0px"
          xmlSpace="preserve"
          className={className}
        >
          <g><g><polygon points="376.822,153.145 281.402,455.309 512,153.145" /></g></g>
          <g><g><polygon points="74.336,46.263 1.082,134.168 125.614,134.168" /></g></g>
          <g><g><polygon points="437.664,46.263 386.386,134.168 510.918,134.168" /></g></g>
          <g><g><polygon points="135.178,153.145 0,153.145 230.598,455.309" /></g></g>
          <g><g><polygon points="278.906,39.279 367.874,128.247 419.768,39.279" /></g></g>
          <g><g><polygon points="92.232,39.279 144.126,128.247 233.094,39.279" /></g></g>
          <g><g><polygon points="155.076,153.145 256,472.721 356.924,153.145" /></g></g>
          <g><g><polygon points="256,43.208 165.04,134.168 346.96,134.168" /></g></g>
        </svg>
      );
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
        {path && <path transform={`translate(${transform} 0)`} d={path} />}
      </svg>
    );
  }
}

export default Icon;
