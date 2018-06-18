import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { Icon, Info, Success, Tag, Thumbnail, Warning } from "../src";
import paths from "../src/icons.json";

const Heading = ({ children }) => <h1>{"<"}{children}{">"}</h1>;

const Icons = () => (
  Object.keys(paths).map(icon => (
    <span key={icon} title={icon}>
      <Icon icon={icon} />
    </span>
  ))
);

const App = () => (
  <Fragment>
    <Heading>Icon icon=string</Heading>
    <Icons />

    <Heading>Info</Heading>
    <Info>This is an info.</Info>

    <Heading>Success</Heading>
    <Success>This is a success.</Success>

    <Heading>Tag color=string</Heading>
    <Tag>Blue</Tag>
    <Tag color="gray">Gray</Tag>
    <Tag color="red">Red</Tag>

    <Heading>Thumbnail image=string</Heading>
    {[1, 2, 3, 4, 5].map(ident => (
      <Thumbnail
        key={ident}
        image={`https://robohash.org/${ident}`}
        title={`Robot ${ident}`}
      />
    ))}

    <Heading>Warning</Heading>
    <Warning>This is a warning.</Warning>
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById("main"));
