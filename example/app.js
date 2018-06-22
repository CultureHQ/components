import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Button, Icon, Info, Success, Tag, Thumbnail, Warning } from "../src";
import paths from "../src/icons.json";

const Code = styled.pre`font-size: 2em;`;

const Heading = ({ children }) => <Code>{"<"}{children}{">"}</Code>;

const Icons = () =>
  Object.keys(paths).map(icon => (
    <span key={icon} title={icon}>
      <Icon icon={icon} />
    </span>
  ));

const App = () => (
  <Fragment>
    <Heading>Button</Heading>

    <Button>Default</Button>{" "}
    <Button icon="clipboard">Icon</Button>{" "}
    <Button loading>Loading</Button>{" "}
    <Button disabled>Disabled</Button>{" "}

    <Button primary>Primary</Button>{" "}
    <Button icon="clipboard" primary>Primary Icon</Button>{" "}

    <Button small>Small</Button>{" "}
    <Button icon="clipboard" small>Small Icon</Button>{" "}

    <Button inverted>Inverted</Button>{" "}
    <Button icon="clipboard" inverted>Inverted Icon</Button>

    <Heading>Icon</Heading>
    <Icons />

    <Heading>Info</Heading>
    <Info>This is an info.</Info>

    <Heading>Success</Heading>
    <Success>This is a success.</Success>

    <Heading>Tag</Heading>
    <Tag>Blue</Tag>
    <Tag color="gray">Gray</Tag>
    <Tag color="red">Red</Tag>

    <Heading>Thumbnail</Heading>
    {[0, 1, 2, 3, 4, 5].map(ident => (
      <Thumbnail
        key={ident}
        image={`https://robohash.org/${ident}`}
        title={`Robot ${ident}`}
        size={(Math.floor(ident / 3) + 1) * 25}
      />
    ))}

    <Heading>Warning</Heading>
    <Warning>This is a warning.</Warning>
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById("main"));
