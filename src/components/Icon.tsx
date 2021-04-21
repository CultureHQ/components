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
      case "calendar-date":
      case "calendar-date-filled":
      case "checklist":
      case "clipboard":
      case "diamond":
      case "diamond-filled":
      case "edit-outlined":
      case "expand":
      case "facebook":
      case "file":
      case "file-filled":
      case "global":
      case "hammer-filled":
      case "hammer":
      case "home":
      case "home-outlined":
      case "info-thinner":
      case "image-outlined":
      case "instagram":
      case "ios-flag":
      case "ios-flag-outline":
      case "ios-people":
      case "ios-people-outline":
      case "ios-star-outline":
      case "link-wider":
      case "linkedin":
      case "mortarboard":
      case "mortarboard-filled":
      case "open-book":
      case "open-book-filled":
      case "page":
      case "pin":
      case "pin-outline":
      case "play":
      case "play-filled":
      case "post":
      case "rocket":
      case "send":
      case "send-filled":
      case "share":
      case "share-outlined":
      case "slack":
      case "snapchat":
      case "star":
      case "sticky-note":
      case "sticky-note-filled":
      case "supermarket":
      case "supermarket-filled":
      case "tale":
      case "thunder":
      case "thunder-filled":
      case "tiktok":
      case "trash-a":
      case "trash-a-outlined":
      case "twitter":
      case "user-filled":
      case "web-development":
      case "web-development-filled":
        viewBox = "512";
        break;
      case "clock-filled":
        viewBox = "16";
        break;
      case "building":
      case "building-filled":
        viewBox = "468";
        break;
      case "page-filled":
        viewBox = "640";
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

    if (icon === "send-filled") {
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
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="send-(6)" transform="translate(317.000000, 196.000000) scale(1, -1) rotate(45.000000) translate(-317.000000, -196.000000) translate(61.000000, -25.000000)" fill="#000000" fillRule="nonzero">
              <path d="M481.508,175.336 L68.414,3.926 C51.011,-3.296 31.35,-0.119 17.105,12.213 C2.86,24.547 -3.098,43.551 1.558,61.808 L38.327,206 L509.651626,206 C509.651626,206 512,211.385257 512,221 C512,230.614743 509.651626,236.002 509.651626,236.002 L38.327,236.002 L1.558,380.193 C-3.098,398.451 2.859,417.455 17.105,429.788 C31.379,442.145 51.042,445.283 68.415,438.075 L481.509,266.666 C500.317,258.862 512,241.363 512,221 C512,200.637 500.317,183.139 481.508,175.336 Z" id="Path" />
            </g>
          </g>
        </svg>
      );
    }

    if (icon === "sticky-note-filled") {
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
          <g>
            <path d="m497 145.5h-137.35v63c0 8.28-6.71 15-15 15-8.28 0-15-6.72-15-15v-63h-137c-8.28 0-15 6.72-15 15v320c0 8.28 6.72 15 15 15h304.35c8.29 0 15-6.72 15-15v-320c0-8.28-6.71-15-15-15zm-80.35 253h-144c-8.28 0-15-6.72-15-15s6.72-15 15-15h144c8.29 0 15 6.72 15 15s-6.71 15-15 15zm0-80h-144c-8.28 0-15-6.72-15-15s6.72-15 15-15h144c8.29 0 15 6.72 15 15s-6.71 15-15 15z" />
            <path d="m296.581 115.5-160.997-61.911c-3.713-1.428-7.841-1.323-11.477.294-3.635 1.616-6.479 4.61-7.907 8.323l-115.197 298.68c-2.973 7.732.884 16.411 8.617 19.384l138.033 52.947v-103.928l-59.006-22.688c-7.732-2.973-11.59-11.651-8.617-19.384 2.973-7.732 11.651-11.593 19.384-8.617l48.24 18.548v-53.568l-30.296-11.648c-7.732-2.973-11.59-11.652-8.618-19.384 2.973-7.732 11.649-11.591 19.384-8.618l19.529 7.509v-50.939c0-24.813 20.187-45 45-45z" />
            <path d="m359.65 109.23c19.12-6.15 33-24.09 33-45.23 0-26.19-21.31-47.5-47.5-47.5s-47.5 21.31-47.5 47.5c0 20.76 13.4 38.45 32 44.89v36.61h30zm-14.5-27.73c-9.65 0-17.5-7.85-17.5-17.5s7.85-17.5 17.5-17.5 17.5 7.85 17.5 17.5-7.85 17.5-17.5 17.5z" />
          </g>
        </svg>
      );
    }

    if (icon === "web-development") {
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
          <path d="m467 1h-422c-24.813 0-45 20.187-45 45v420c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45v-420c0-24.813-20.187-45-45-45zm-422 30h422c8.271 0 15 6.729 15 15v75h-452v-75c0-8.271 6.729-15 15-15zm422 450h-422c-8.271 0-15-6.729-15-15v-315h452v315c0 8.271-6.729 15-15 15z" />
          <path d="m306.909 197.213c-7.614-3.263-16.433.264-19.696 7.878l-90 210c-3.264 7.614.264 16.433 7.878 19.696 7.617 3.264 16.434-.266 19.696-7.878l90-210c3.264-7.615-.264-16.433-7.878-19.696z" />
          <path d="m177.713 246.629c-5.176-6.469-14.617-7.517-21.083-2.342l-75 60c-7.499 5.997-7.504 17.424 0 23.426l75 60c6.469 5.176 15.91 4.126 21.083-2.342 5.175-6.469 4.127-15.909-2.343-21.083l-60.358-48.288 60.358-48.287c6.47-5.175 7.518-14.614 2.343-21.084z" />
          <path d="m430.37 304.287-75-60c-6.469-5.176-15.909-4.127-21.083 2.342-5.175 6.469-4.127 15.909 2.343 21.083l60.358 48.288-60.358 48.287c-6.47 5.175-7.518 14.614-2.343 21.083 5.182 6.476 14.623 7.512 21.083 2.342l75-60c7.499-5.997 7.504-17.423 0-23.425z" />
          <circle cx="76" cy="76" r="15" />
          <circle cx="136" cy="76" r="15" />
          <circle cx="196" cy="76" r="15" />
          <path d="m346 91h90c8.284 0 15-6.716 15-15s-6.716-15-15-15h-90c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
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
