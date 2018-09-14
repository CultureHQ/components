import React, { Fragment } from "react";

import CheckmarkContainer from "./CheckmarkContainer";
import CheerButtonContainer from "./CheerButtonContainer";
import HamburgerContainer from "./HamburgerContainer";
import IconsContainer from "./IconsContainer";
import LoaderContainer from "./LoaderContainer";
import PaginationContainer from "./PaginationContainer";

import {
  Badge, BooleanField, Button, CentsField, Checklist, Cheer, Circles,
  EmailField, FeedItem, FileField, Form, Info, Nav, NumberField, Panel,
  PasswordField, Spinner, StringField, SubmitButton, Subnav, Success, Tag,
  Thumbnail, Tooltip, Warning
} from "../../src";

const Heading = ({ children }) => (
  <Fragment>
    <pre>{"<"}{children}{">"}</pre>
    <hr />
  </Fragment>
);

const PropList = ({ children }) => <ul className="prop-list">{children}</ul>;

const Prop = ({ name, children }) => <li><code>{name}</code> - {children}</li>;

const ClassNameProp = () => <Prop name="className?">an extra {"class"} name</Prop>;

const Subcomponent = ({ children }) => <p><code>{children}</code> subcomponent</p>;

const onSubmit = values => {
  console.log(values); // eslint-disable-line no-console
  return new Promise(resolve => setTimeout(() => resolve(), 1000));
};

const TOOLTIP = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus neque
  leo, quis bibendum justo facilisis quis. Praesent justo ante, efficitur non
  lacus sit amet, bibendum tempor mauris. Morbi et metus dignissim, lacinia diam
  in, varius quam. Ut a orci luctus, aliquam dui vitae, condimentum augue.
  Mauris luctus ultrices faucibus. Praesent neque leo, congue id ornare non,
  imperdiet et tortor. Proin dictum tellus vitae felis porttitor, a vehicula
  lorem consequat.
`;

const App = () => (
  <Fragment>
    <Nav>{"<Nav>"}</Nav>

    <div className="container">
      <Heading>Badge</Heading>
      <p>A component for displaying associated metadata.</p>
      <PropList>
        <Prop name="children">displayed inside the badge</Prop>
        <ClassNameProp />
        <Prop name="onClick?">a click handler</Prop>
        <Prop name="primary? = false">indicates a primary badge</Prop>
      </PropList>

      <Badge className="badge">Default</Badge>
      <Badge className="badge" primary>Primary</Badge>

      <Heading>BooleanField</Heading>
      <p>A form field that represents a boolean value.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that accepts one argument that represents the new value of the field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="value">the value of the input field</Prop>
      </PropList>

      <Form>
        <BooleanField name="boolean">Boolean</BooleanField>
      </Form>

      <Heading>Button</Heading>
      <p>A generic button component.</p>
      <PropList>
        <Prop name="children">displayed inside the button</Prop>
        <ClassNameProp />
        <Prop name="disabled?">disallows clicking on the button</Prop>
        <Prop name="icon?">an icon to display inside the button</Prop>
        <Prop name="inverted?">indicates the inverted theme</Prop>
        <Prop name="loading?">displays a spinner inside the button</Prop>
        <Prop name="onClick">the callback when the button is clicked</Prop>
        <Prop name="primary?">indicates a larger primary button</Prop>
        <Prop name="small?">indicates a small button</Prop>
        <Prop name={"type? = \"button\""}>the type of the button component</Prop>
      </PropList>

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

      <Heading>CentsField</Heading>
      <p>A number form field that tracks in cents and displays in dollar amounts.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="value">the value of the input field</Prop>
      </PropList>

      <Form>
        <CentsField name="cents" required>Cents</CentsField>
      </Form>

      <Heading>Checklist</Heading>
      <p>A list of items and their associated status.</p>
      <PropList>
        <Prop name="children">checklist items, usually <code>Checklist.Item</code> components</Prop>
        <ClassNameProp />
      </PropList>
      <Subcomponent>Checklist.Item</Subcomponent>
      <PropList>
        <Prop name="children">displayed inside the item</Prop>
        <Prop name="checked?">boolean value of whether or not this item is complete</Prop>
      </PropList>

      <Checklist>
        <Checklist.Item checked>Checked</Checklist.Item>
        <Checklist.Item>Unchecked</Checklist.Item>
      </Checklist>

      <Heading>Checkmark</Heading>
      <p>A boolean value represented by a circle with an optional check.</p>
      <PropList>
        <Prop name="checked?">boolean value of whether or not this item is complete</Prop>
        <Prop name="children?">an optional label for the circle</Prop>
        <ClassNameProp />
        <Prop name="onClick?">a click handler (allows this to be a controller component)</Prop>
      </PropList>

      <CheckmarkContainer />

      <Heading>Cheer</Heading>
      <p>An SVG of a person cheering.</p>
      <PropList>
        <ClassNameProp />
        <Prop name={"color? = \"darkblue\""}>
          sets the fill of the SVG, can be one of <code>"darkblue"</code>,
          <code>"lightblue"</code>, <code>"yellow"</code>, or <code>"green"</code>
        </Prop>
        <Prop name="name?">an optional name that will appear in a tooltip</Prop>
        <Prop name="pop? = false">whether or not this <code>Cheer</code> should pop in</Prop>
      </PropList>

      <Cheer color="darkblue" pop />
      <Cheer name="Kevin" color="lightblue" />
      <Cheer name="Brian" color="yellow" />
      <Cheer name="Jimmy" color="green" />

      <Heading>CheerButton</Heading>
      <p>An SVG of a person cheering.</p>
      <PropList>
        <Prop name="cheered">the state of whether or not this entity has been cheered</Prop>
        <ClassNameProp />
        <Prop name="name?">an optional name that will appear in a tooltip</Prop>
        <Prop name="onCheerToggle">a callback function that accepts a boolean <code>cheered</code> state and returns a <code>Promise</code></Prop>
      </PropList>

      <CheerButtonContainer />{" "}
      <CheerButtonContainer cheered name="Kevin" />

      <Heading>Circles</Heading>
      <p>The CultureHQ circles. (Try hovering.)</p>
      <PropList>
        <ClassNameProp />
      </PropList>

      <Circles />

      <Heading>EmailField</Heading>
      <p>A string form field that accepts an email.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value">the value of the input field</Prop>
      </PropList>

      <Form>
        <EmailField name="email" required>Email</EmailField>
      </Form>

      <Heading>FeedItem</Heading>
      <p>A contained item in a feed.</p>
      <PropList>
        <Prop name="children">sections of the item, usually <code>FeedItem.Body</code> and <code>FeedItem.Footer</code> components</Prop>
        <ClassNameProp />
      </PropList>

      <Subcomponent>FeedItem.Body</Subcomponent>
      <PropList>
        <Prop name="children">displayed inside the body</Prop>
        <ClassNameProp />
      </PropList>

      <Subcomponent>FeedItem.Footer</Subcomponent>
      <PropList>
        <Prop name="children">displayed inside the footer</Prop>
        <ClassNameProp />
      </PropList>

      <FeedItem>
        <FeedItem.Body>This is a feed item.</FeedItem.Body>
        <FeedItem.Footer>This is the footer of the feed item.</FeedItem.Footer>
      </FeedItem>

      <Heading>FileField</Heading>
      <p>A file form field.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that accepts one argument that represents the new value of the file field</Prop>
        <Prop name="multiple? = false">whether or not this field accepts multiple files</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value">the value of the file field</Prop>
      </PropList>

      <Form>
        <FileField name="file" required>File</FileField>
        <FileField name="files" multiple required>Files</FileField>
      </Form>

      <Heading>Form</Heading>
      <p>A generic form component.</p>
      <PropList>
        <Prop name="children">the fields to display inside the form</Prop>
        <ClassNameProp />
        <Prop name="initialValues">the initial values of the form fields</Prop>
        <Prop name="onSubmit">a callback when the form has been submitted (expected to return a <code>Promise</code>)</Prop>
      </PropList>

      <Heading>Hamburger</Heading>
      <p>A boolean value represented by a hamburger or an x depending on status.</p>
      <PropList>
        <ClassNameProp />
        <Prop name="onToggle">a function called when the hamburger is toggled</Prop>
        <Prop name="open">whether or not the hamburger should be displayed as open</Prop>
      </PropList>

      <HamburgerContainer />

      <Heading>Icon</Heading>
      <p>An SVG icon that fetches its paths asynchronously.</p>
      <PropList>
        <ClassNameProp />
        <Prop name="icon">the name of the path to display</Prop>
      </PropList>

      <IconsContainer />

      <Heading>Info</Heading>
      <p>Displays a informational message.</p>
      <PropList>
        <Prop name="children">displayed inside the box</Prop>
        <ClassNameProp />
      </PropList>

      <Info>This is an info.</Info>

      <Heading>Loader</Heading>
      <p>A component that waits for something to be loaded, and displays a spinner if it takes too long to load.</p>
      <PropList>
        <Prop name="children">the components to display once <code>loading</code> is false</Prop>
        <Prop name="loading">whether or not <code>loading</code> is taking place</Prop>
      </PropList>

      <LoaderContainer />

      <Heading>Nav</Heading>
      <p>A top-level nav that displays at the top of the page. It hides when you scroll down and shows when you scroll up. (Displayed above.)</p>
      <PropList>
        <Prop name="children">the components to display inside the nav</Prop>
        <ClassNameProp />
      </PropList>

      <Heading>NumberField</Heading>
      <p>A number form field.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value">the value of the input field</Prop>
      </PropList>

      <Form>
        <NumberField name="number" required>Number</NumberField>
      </Form>

      <Heading>Pagination</Heading>
      <p>Displays pagination information with buttons for looking through different pages.</p>
      <PropList>
        <ClassNameProp />
        <Prop name="currentPage">an integer representing the current page number</Prop>
        <Prop name="onClick">a callback function that will be called with the new page number when the page is changed</Prop>
        <Prop name="totalPages">an integer representing the total number of pages</Prop>
      </PropList>

      <PaginationContainer totalPages={1} />
      <PaginationContainer totalPages={2} />
      <PaginationContainer totalPages={4} />
      <PaginationContainer totalPages={8} />
      <PaginationContainer totalPages={16} />

      <Heading>Panel</Heading>
      <p>Boxed information to be displayed. Expects a heading and sometimes has a footer.</p>
      <PropList>
        <Prop name="children">
          the components to be displayed inside the panel, expected to be instances of{" "}
          <code>Panel.Heading</code>, <code>Panel.Body</code>, <code>Panel.LoaderBody</code>, or <code>Panel.Footer</code>
        </Prop>
        <ClassNameProp />
      </PropList>

      <Subcomponent>Panel.Heading</Subcomponent>
      <PropList>
        <Prop name="children">the content of the heading</Prop>
        <ClassNameProp />
        <Prop name="primary?">whether or not this should be displayed as a primary heading (with a primary background color)</Prop>
      </PropList>

      <Subcomponent>Panel.Body</Subcomponent>
      <PropList>
        <Prop name="children">the content of the body</Prop>
        <ClassNameProp />
      </PropList>

      <Subcomponent>Panel.LoaderBody</Subcomponent>
      <PropList>
        <Prop name="children">the content of the body</Prop>
        <ClassNameProp />
        <Prop name="loading?">whether or not the content is still loading</Prop>
      </PropList>

      <Subcomponent>Panel.Footer</Subcomponent>
      <PropList>
        <Prop name="children">the content of the footer</Prop>
        <ClassNameProp />
      </PropList>

      <Panel>
        <Panel.Heading>Heading</Panel.Heading>
        <Panel.Body>Body</Panel.Body>
        <Panel.Footer>Footer</Panel.Footer>
      </Panel>

      <Panel>
        <Panel.Heading primary>Primary Heading</Panel.Heading>
        <Panel.Body>Body</Panel.Body>
      </Panel>

      <Heading>PasswordField</Heading>
      <p>A password form field.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value">the value of the input field</Prop>
      </PropList>

      <Form>
        <PasswordField name="password" required>Password</PasswordField>
      </Form>

      <Heading>Spinner</Heading>
      <p>A circular spinner using the CultureHQ colors.</p>
      <PropList>
        <ClassNameProp />
      </PropList>

      <Spinner />

      <Heading>StringField</Heading>
      <p>A string form field.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value">the value of the input field</Prop>
      </PropList>

      <Form>
        <StringField name="string" required>String</StringField>
      </Form>

      <Heading>SubmitButton</Heading>
      <p>A button used to submit a form. Accepts all of the same props as a regular <code>Button</code> component, with the addition of:</p>
      <PropList>
        <Prop name="children?">a function that accepts a single argument (<code>submitting</code>) that should return valid React children depending on that boolean argument</Prop>
        <Prop name="submitting">a boolean value representing whether or not the form is currently submitting</Prop>
      </PropList>

      <Form onSubmit={onSubmit}>
        <SubmitButton primary />
      </Form>

      <Heading>Subnav</Heading>
      <p>A navigation menu for within the application. Can function as either a controlled component or an uncontrolled component.</p>
      <PropList>
        <Prop name="activeIndex?">an integer that represents the index of the child that is currently active, passed if you want to use this component as a controlled component</Prop>
        <Prop name="children">a list of subnav items, usually <code>Subnav.Item</code> components</Prop>
        <ClassNameProp />
        <Prop name="onChange">a function that is called with the index of the new active item when the subnav changes</Prop>
      </PropList>

      <Subcomponent>Subnav.Item</Subcomponent>
      <PropList>
        <Prop name="children">the content of the nav link</Prop>
        <ClassNameProp />
      </PropList>

      <Subnav>
        <Subnav.Item>One</Subnav.Item>
        <Subnav.Item>Two</Subnav.Item>
        <Subnav.Item>Three</Subnav.Item>
      </Subnav>

      <Heading>Success</Heading>
      <p>Displays a success message.</p>
      <PropList>
        <Prop name="children">displayed inside the box</Prop>
        <ClassNameProp />
      </PropList>

      <Success>This is a success.</Success>

      <Heading>Tag</Heading>
      <p>A component for displaying an associated status.</p>
      <PropList>
        <Prop name="children">displayed inside the tag</Prop>
        <ClassNameProp />
        <Prop name={"color? = \"blue\""}>can be one of <code>"blue"</code>, <code>"gray"</code>, or <code>"red"</code></Prop>
      </PropList>

      <Tag>Blue</Tag>
      <Tag color="gray">Gray</Tag>
      <Tag color="red">Red</Tag>

      <Heading>Thumbnail</Heading>
      <p>A small image that should be displayed inline.</p>
      <PropList>
        <ClassNameProp />
        <Prop name="image">the image to be displayed</Prop>
        <Prop name={"size? = \"small\""}>can be <code>"small"</code>, <code>"medium"</code>, or <code>"large"</code></Prop>
        <Prop name="square? = false">whether or not this image should be displayed as a square</Prop>
        <Prop name="title?">an optional title for the image</Prop>
      </PropList>

      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(ident => (
        <Thumbnail
          key={ident}
          image={`https://robohash.org/${ident}`}
          title={`Robot ${ident}`}
          size={["small", "medium", "large"][Math.floor(ident / 4)]}
          square={Math.floor(ident % 4) >= 2}
        />
      ))}

      <Heading>Tooltip</Heading>
      <p>A tip that pops over the content inside of it. Aware of the left side of the page.</p>
      <PropList>
        <Prop name="children">The content that has a tip</Prop>
        <ClassNameProp />
        <Prop name="tip">The text to display inside the tip</Prop>
      </PropList>

      <Tooltip tip={TOOLTIP}>
        <Button primary disabled>Some action</Button>
      </Tooltip>

      <Heading>Warning</Heading>
      <p>Displays a warning message.</p>
      <PropList>
        <Prop name="children">displayed inside the box</Prop>
        <ClassNameProp />
      </PropList>

      <Warning>This is a warning.</Warning>
    </div>
  </Fragment>
);

export default App;
