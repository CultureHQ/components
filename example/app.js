import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { Button, Icon, Info, Success, Tag, Thumbnail, Warning } from "../src";
import paths from "../src/icons.json";

const Code = styled.pre`font-size: 2em;`

const Heading = ({ children }) => <Code>{"<"}{children}{">"}</Code>;

const Icons = () =>
  Object.keys(paths).map(icon => (
    <span key={icon} title={icon}>
      <Icon icon={icon} />
    </span>
  ));

const onClick = message => () => alert(`${message} button clicked`);

const App = () => (
  <Fragment>
    <Heading>Button</Heading>

    <Button onClick={onClick("Default")}>Default</Button>{" "}
    <Button icon="clipboard" onClick={onClick("Icon")}>Icon</Button>{" "}
    <Button loading onClick={onClick("Loading")}>Loading</Button>{" "}
    <Button disabled>Disabled</Button>{" "}
 
    <Button primary onClick={onClick("Primary")}>Primary</Button>{" "}
    <Button icon="clipboard" primary onClick={onClick("Primary Icon")}>Primary Icon</Button>{" "}
 
    <Button small onClick={onClick("Small")}>Small</Button>{" "}
    <Button icon="clipboard" small onClick={onClick("Small Icon")}>Small Icon</Button>{" "}

    <Button inverted onClick={onClick("Inverted")}>Inverted</Button>{" "}
    <Button icon="clipboard" inverted onClick={onClick("Inverted Icon")}>Inverted Icon</Button>

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
