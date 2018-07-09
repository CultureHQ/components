import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import {
  Badge,
  Button,
  FeedItem,
  Icon,
  Info,
  Subnav,
  Success,
  Tag,
  Thumbnail,
  Warning
} from "../src";
import paths from "../src/icons.json";

const Code = styled.pre`font-size: 2em;`;

const Heading = ({ children }) => <Code>{"<"}{children}{">"}</Code>;

const Icons = () => (
  <div className="icons">
    {Object.keys(paths).map(icon => (
      <span key={icon} title={icon}>
        <Icon icon={icon} />
      </span>
    ))}
  </div>
);

const App = () => (
  <Fragment>
    <Heading>Badge</Heading>
    <Badge className="badge">Default</Badge>
    <Badge className="badge" primary>Primary</Badge>

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

    <Heading>FeedItem</Heading>
    <FeedItem>
      <FeedItem.Body>This is a feed item.</FeedItem.Body>
      <FeedItem.Footer>This is the footer of the feed item.</FeedItem.Footer>
    </FeedItem>

    <Heading>Icon</Heading>
    <Icons />

    <Heading>Info</Heading>
    <Info>This is an info.</Info>

    <Heading>Subnav</Heading>
    <Subnav>
      <Subnav.Item>One</Subnav.Item>
      <Subnav.Item>Two</Subnav.Item>
      <Subnav.Item>Three</Subnav.Item>
    </Subnav>

    <Heading>Success</Heading>
    <Success>This is a success.</Success>

    <Heading>Tag</Heading>
    <Tag>Blue</Tag>
    <Tag color="gray">Gray</Tag>
    <Tag color="red">Red</Tag>

    <Heading>Thumbnail</Heading>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(ident => (
      <Thumbnail
        key={ident}
        className="thumbnail"
        image={`https://robohash.org/${ident}`}
        title={`Robot ${ident}`}
        size={["small", "medium", "large"][Math.floor(ident / 4)]}
        square={Math.floor(ident % 4) >= 2}
      />
    ))}

    <Heading>Warning</Heading>
    <Warning>This is a warning.</Warning>
  </Fragment>
);

ReactDOM.render(<App />, document.getElementById("main"));
