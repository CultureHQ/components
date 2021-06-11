import React from "react";

import * as iconPaths from "../icons.json";

export type IconName = keyof typeof iconPaths;

type IconProps = {
  className?: string;
  viewBox?: string;
  icon: IconName;
  color?: string;
  onClick?: any;
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
    const { className, color, icon, onClick } = this.props;
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
      case "ios-plus":
      case "ios-plus-outline":
      case "ios-star-outline":
      case "link-wider":
      case "linkedin":
      case "medal":
      case "medal-filled":
      case "mortarboard":
      case "mortarboard-filled":
      case "open-book":
      case "open-book-filled":
      case "page":
      case "pause":
      case "pin":
      case "pin-outline":
      case "play":
      case "play-filled":
      case "post":
      case "preview":
      case "preview-filled":
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
      case "play-no-border":
        viewBox = "264";
        break;
      case "art-palette":
      case "art-palette-filled":
        viewBox = "326";
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
          <g><g><polygon fill={color} points="376.822,153.145 281.402,455.309 512,153.145" /></g></g>
          <g><g><polygon fill={color} points="74.336,46.263 1.082,134.168 125.614,134.168" /></g></g>
          <g><g><polygon fill={color} points="437.664,46.263 386.386,134.168 510.918,134.168" /></g></g>
          <g><g><polygon fill={color} points="135.178,153.145 0,153.145 230.598,455.309" /></g></g>
          <g><g><polygon fill={color} points="278.906,39.279 367.874,128.247 419.768,39.279" /></g></g>
          <g><g><polygon fill={color} points="92.232,39.279 144.126,128.247 233.094,39.279" /></g></g>
          <g><g><polygon fill={color} points="155.076,153.145 256,472.721 356.924,153.145" /></g></g>
          <g><g><polygon fill={color} points="256,43.208 165.04,134.168 346.96,134.168" /></g></g>
        </svg>
      );
    }

    if (icon === "preview") {
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
            <path fill={color} d="m75 190h170c8.284 0 15-6.716 15-15s-6.716-15-15-15h-170c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
            <path fill={color} d="m205 220h-130c-8.284 0-15 6.716-15 15s6.716 15 15 15h130c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
            <path fill={color} d="m205 280h-130c-8.284 0-15 6.716-15 15s6.716 15 15 15h130c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
            <path fill={color} d="m205 340h-130c-8.284 0-15 6.716-15 15s6.716 15 15 15h130c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
            <path fill={color} d="m507.606 422.886-75.007-75.007c30.769-41.096 27.492-99.787-9.845-137.125-9.575-9.575-20.678-17.067-32.754-22.261v-73.493c0-3.978-1.58-7.793-4.394-10.606l-99.996-100c-2.812-2.813-6.628-4.394-10.606-4.394h-220.004c-30.327 0-55 24.673-55 55v402c0 30.327 24.673 55 55 55h280c30.327 0 55-24.673 55-55v-75.493c7.56-3.252 14.737-7.404 21.396-12.406l74.997 74.997c2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.464 10.606-4.394c5.86-5.857 5.86-15.354.001-21.212zm-106.065-84.853c-8.677 8.677-19.11 14.952-30.493 18.523-.349.095-.693.203-1.031.322-6.891 2.052-14.117 3.122-21.509 3.122-20.033 0-38.868-7.801-53.033-21.967-14.166-14.166-21.967-33-21.967-53.033s7.801-38.867 21.967-53.033c14.165-14.166 33-21.967 53.033-21.967 7.394 0 14.622 1.07 21.514 3.123.335.118.674.224 1.02.318 11.385 3.571 21.821 9.847 30.5 18.525 29.241 29.244 29.24 76.825-.001 106.067zm-62.754-238.033h-48.787v-48.786zm21.213 357c0 13.785-11.215 25-25 25h-280c-13.785 0-25-11.215-25-25v-402c0-13.785 11.215-25 25-25h205v85c0 8.284 6.716 15 15 15h85v50.625c-3.791-.41-7.625-.625-11.492-.625-28.047 0-54.415 10.922-74.246 30.754-19.832 19.832-30.754 46.2-30.754 74.246 0 28.047 10.922 54.415 30.754 74.246 19.831 19.832 46.199 30.754 74.246 30.754 3.867 0 7.701-.215 11.492-.625z" />
          </g>
        </svg>
      );
    }

    if (icon === "preview-filled") {
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
            <path fill={color} d="m290 8.784v91.216h91.213z" />
            <path fill={color} d="m363.508 180c9.101 0 17.966 1.024 26.492 2.953v-52.953h-115c-8.284 0-15-6.716-15-15v-115h-205c-30.327 0-55 24.673-55 55v402c0 30.327 24.673 55 55 55h280c30.327 0 55-24.673 55-55v-39.953c-8.526 1.929-17.391 2.953-26.492 2.953-66.168 0-120-53.832-120-120s53.832-120 120-120zm-158.508 190h-130c-8.284 0-15-6.716-15-15s6.716-15 15-15h130c8.284 0 15 6.716 15 15s-6.716 15-15 15zm0-60h-130c-8.284 0-15-6.716-15-15s6.716-15 15-15h130c8.284 0 15 6.716 15 15s-6.716 15-15 15zm0-60h-130c-8.284 0-15-6.716-15-15s6.716-15 15-15h130c8.284 0 15 6.716 15 15s-6.716 15-15 15zm40-60h-170c-8.284 0-15-6.716-15-15s6.716-15 15-15h170c8.284 0 15 6.716 15 15s-6.716 15-15 15z" />
            <path fill={color} d="m507.606 422.886-70.766-70.766c10.49-14.717 16.667-32.711 16.667-52.12 0-49.626-40.374-90-90-90s-90 40.374-90 90 40.374 90 90 90c19.41 0 37.403-6.177 52.12-16.667l70.765 70.765c2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.464 10.606-4.394c5.861-5.857 5.861-15.354.002-21.212z" />
          </g>
        </svg>
      );
    }

    if (icon === "medal") {
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
            <path fill={color} d="m47.604 458.386c4.018 4.389 10.25 5.988 15.886 4.075l64.215-21.804 26.846 62.274c2.362 5.479 7.747 9.038 13.713 9.062h.062c5.942 0 11.326-3.508 13.725-8.949l50.042-113.51c7.836.962 15.811 1.467 23.903 1.467s16.067-.504 23.903-1.467l50.042 113.51c2.398 5.441 7.783 8.95 13.726 8.949h.062c5.967-.024 11.351-3.583 13.713-9.062l26.847-62.274 64.215 21.804c5.631 1.913 11.868.315 15.886-4.075 4.019-4.389 5.063-10.739 2.66-16.184l-56.326-127.672c25.242-32.873 40.273-73.976 40.273-118.53 0-108.075-87.477-196-195-196s-195 87.925-195 196c0 44.554 15.031 85.658 40.273 118.53l-56.326 127.672c-2.402 5.445-1.359 11.795 2.66 16.184zm378.218-35.309-45.002-15.281c-7.406-2.516-15.501 1.084-18.598 8.266l-18.709 43.398-33.534-76.067c29.739-8.58 56.573-24.067 78.66-44.598zm-334.825-227.077c0-91.533 74.019-166 165-166s165 74.467 165 166c0 90.981-74.019 165-165 165s-165-74.019-165-165zm32.357 142.795c22.088 20.531 48.922 36.019 78.661 44.598l-33.535 76.066-18.708-43.398c-3.097-7.183-11.192-10.781-18.597-8.266l-45.003 15.281z" />
            <path fill={color} d="m197.082 215.143-8.771 51.133c-.965 5.627 1.348 11.315 5.967 14.671 4.611 3.35 10.735 3.803 15.797 1.142l45.921-24.142 45.92 24.142c5.055 2.657 11.18 2.214 15.797-1.142 4.619-3.356 6.933-9.043 5.968-14.671l-8.77-51.133 37.15-36.213c4.088-3.985 5.56-9.946 3.795-15.376s-6.458-9.388-12.108-10.209l-51.341-7.46-22.96-46.522c-2.527-5.12-7.742-8.362-13.451-8.362s-10.924 3.241-13.451 8.362l-22.96 46.522-51.341 7.46c-5.65.821-10.345 4.779-12.109 10.209-1.765 5.43-.293 11.391 3.795 15.377zm34.621-40.705c4.886-.71 9.109-3.778 11.294-8.206l12.999-26.339 12.999 26.339c2.185 4.427 6.409 7.496 11.294 8.206l29.067 4.224-21.033 20.502c-3.535 3.446-5.148 8.411-4.313 13.277l4.965 28.95-25.999-13.668c-4.369-2.297-9.59-2.298-13.96 0l-25.999 13.668 4.965-28.95c.834-4.866-.779-9.831-4.314-13.277l-21.034-20.502z" />
          </g>
        </svg>
      );
    }

    if (icon === "medal-filled") {
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
            <path fill={color} d="m256 392c107.52 0 195-88.48 195-196s-87.48-196-195-196-195 88.48-195 196 87.48 196 195 196zm-99.858-228.461c1.772-5.42 6.46-9.375 12.114-10.195l51.328-7.456 22.969-46.523c5.039-10.254 21.855-10.254 26.895 0l22.969 46.523 51.328 7.456c5.654.82 10.342 4.775 12.114 10.195 1.758 5.435.293 11.396-3.794 15.381l-37.148 36.226 8.76 51.138c.967 5.625-1.348 11.309-5.962 14.678-4.658 3.356-10.763 3.783-15.806 1.128l-45.909-24.142-45.908 24.141c-5.039 2.666-11.147 2.212-15.806-1.128-4.614-3.369-6.929-9.053-5.962-14.678l8.76-51.138-37.148-36.226c-4.087-3.983-5.552-9.945-3.794-15.38z" />
            <path fill={color} d="m227.978 212.436-4.951 28.96 25.986-13.667c2.197-1.158 4.585-1.729 6.987-1.729s4.79.571 6.987 1.729l25.986 13.667-4.951-28.96c-.835-4.863.776-9.829 4.307-13.271l21.035-20.508-29.063-4.219c-4.893-.703-9.111-3.779-11.294-8.203l-13.007-26.339-13.008 26.338c-2.183 4.424-6.401 7.5-11.294 8.203l-29.063 4.219 21.035 20.508c3.531 3.442 5.143 8.408 4.308 13.272z" />
            <path fill={color} d="m47.597 458.357c4.014 4.424 10.225 5.991 15.894 4.102l64.219-21.797 26.851 62.271c2.373 5.508 8.276 7.734 13.77 9.067 5.918 0 11.294-3.486 13.711-8.906l37.474-84.326c-52.121-8.555-98.181-34.979-131.761-72.883l-42.795 96.271c-2.417 5.449-1.392 11.807 2.637 16.201z" />
            <path fill={color} d="m329.96 503.094c2.417 5.42 7.778 8.906 13.711 8.906 4.951-.938 11.396-3.56 13.77-9.067l26.851-62.271 64.219 21.797c5.654 1.89 11.88.322 15.894-4.102 4.028-4.395 5.054-10.752 2.637-16.201l-42.794-96.271c-33.58 37.905-79.64 64.329-131.761 72.883z" />
          </g>
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
              <path fill={color} d="M481.508,175.336 L68.414,3.926 C51.011,-3.296 31.35,-0.119 17.105,12.213 C2.86,24.547 -3.098,43.551 1.558,61.808 L38.327,206 L509.651626,206 C509.651626,206 512,211.385257 512,221 C512,230.614743 509.651626,236.002 509.651626,236.002 L38.327,236.002 L1.558,380.193 C-3.098,398.451 2.859,417.455 17.105,429.788 C31.379,442.145 51.042,445.283 68.415,438.075 L481.509,266.666 C500.317,258.862 512,241.363 512,221 C512,200.637 500.317,183.139 481.508,175.336 Z" id="Path" />
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
            <path fill={color} d="m497 145.5h-137.35v63c0 8.28-6.71 15-15 15-8.28 0-15-6.72-15-15v-63h-137c-8.28 0-15 6.72-15 15v320c0 8.28 6.72 15 15 15h304.35c8.29 0 15-6.72 15-15v-320c0-8.28-6.71-15-15-15zm-80.35 253h-144c-8.28 0-15-6.72-15-15s6.72-15 15-15h144c8.29 0 15 6.72 15 15s-6.71 15-15 15zm0-80h-144c-8.28 0-15-6.72-15-15s6.72-15 15-15h144c8.29 0 15 6.72 15 15s-6.71 15-15 15z" />
            <path fill={color} d="m296.581 115.5-160.997-61.911c-3.713-1.428-7.841-1.323-11.477.294-3.635 1.616-6.479 4.61-7.907 8.323l-115.197 298.68c-2.973 7.732.884 16.411 8.617 19.384l138.033 52.947v-103.928l-59.006-22.688c-7.732-2.973-11.59-11.651-8.617-19.384 2.973-7.732 11.651-11.593 19.384-8.617l48.24 18.548v-53.568l-30.296-11.648c-7.732-2.973-11.59-11.652-8.618-19.384 2.973-7.732 11.649-11.591 19.384-8.618l19.529 7.509v-50.939c0-24.813 20.187-45 45-45z" />
            <path fill={color} d="m359.65 109.23c19.12-6.15 33-24.09 33-45.23 0-26.19-21.31-47.5-47.5-47.5s-47.5 21.31-47.5 47.5c0 20.76 13.4 38.45 32 44.89v36.61h30zm-14.5-27.73c-9.65 0-17.5-7.85-17.5-17.5s7.85-17.5 17.5-17.5 17.5 7.85 17.5 17.5-7.85 17.5-17.5 17.5z" />
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
          <path fill={color} d="m467 1h-422c-24.813 0-45 20.187-45 45v420c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45v-420c0-24.813-20.187-45-45-45zm-422 30h422c8.271 0 15 6.729 15 15v75h-452v-75c0-8.271 6.729-15 15-15zm422 450h-422c-8.271 0-15-6.729-15-15v-315h452v315c0 8.271-6.729 15-15 15z" />
          <path fill={color} d="m306.909 197.213c-7.614-3.263-16.433.264-19.696 7.878l-90 210c-3.264 7.614.264 16.433 7.878 19.696 7.617 3.264 16.434-.266 19.696-7.878l90-210c3.264-7.615-.264-16.433-7.878-19.696z" />
          <path fill={color} d="m177.713 246.629c-5.176-6.469-14.617-7.517-21.083-2.342l-75 60c-7.499 5.997-7.504 17.424 0 23.426l75 60c6.469 5.176 15.91 4.126 21.083-2.342 5.175-6.469 4.127-15.909-2.343-21.083l-60.358-48.288 60.358-48.287c6.47-5.175 7.518-14.614 2.343-21.084z" />
          <path fill={color} d="m430.37 304.287-75-60c-6.469-5.176-15.909-4.127-21.083 2.342-5.175 6.469-4.127 15.909 2.343 21.083l60.358 48.288-60.358 48.287c-6.47 5.175-7.518 14.614-2.343 21.083 5.182 6.476 14.623 7.512 21.083 2.342l75-60c7.499-5.997 7.504-17.423 0-23.425z" />
          <circle fill={color} cx="76" cy="76" r="15" />
          <circle fill={color} cx="136" cy="76" r="15" />
          <circle fill={color} cx="196" cy="76" r="15" />
          <path fill={color} d="m346 91h90c8.284 0 15-6.716 15-15s-6.716-15-15-15h-90c-8.284 0-15 6.716-15 15s6.716 15 15 15z" />
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
        onClick={() => { if (onClick) { onClick(); } }}
      >
        {path && <path fill={color} transform={`translate(${transform} 0)`} d={path} />}
      </svg>
    );
  }
}

export default Icon;
