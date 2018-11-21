import React from "react";
import "../../src/styles/app.scss";

import ClickCloseContainer from "./ClickCloseContainer";
import DoorEffectContainer from "./DoorEffectContainer";
import HamburgerContainer from "./HamburgerContainer";
import IconsContainer from "./IconsContainer";
import ImageEditorContainer from "./ImageEditorContainer";
import LoaderContainer from "./LoaderContainer";
import PaginationContainer from "./PaginationContainer";
import SearchBarContainer from "./SearchBarContainer";

import ActionButton from "./pages/ActionButton";
import Badge from "./pages/Badge";
import BooleanField from "./pages/BooleanField";
import Button from "./pages/Button";
import Calendar from "./pages/Calendar";
import CentsField from "./pages/CentsField";
import Checklist from "./pages/Checklist";
import Checkmark from "./pages/Checkmark";
import Cheer from "./pages/Cheer";
import CheerButton from "./pages/CheerButton";

import {
  Button as ButtonComp,
  Circles, Confirm, ConfirmDelete, DateTimeField, EmailField, FeedItem,
  FileField, Form, ImageField, ImagePreview, Info, Modal, MultiImageField, Nav,
  NumberField, Panel, PasswordField, PlainButton, SelectField, Spinner,
  StringField, SubmitButton, Subnav, Success, Table, Tag, TextField, Thumbnail,
  Tooltip, Warning
} from "../../src";

import { TEXT, OPTIONS, onAccept, onClick, onSubmit } from "./utils";

Modal.setAppElement("#main");

const Heading = ({ children }) => (
  <>
    <pre>{"<"}{children}{">"}</pre>
    <hr />
  </>
);

const PropList = ({ children }) => <ul className="prop-list">{children}</ul>;

const Prop = ({ name, children }) => <li><code>{name}</code> - {children}</li>;

const ClassNameProp = () => <Prop name="className?">an extra {"class"} name</Prop>;

const Subcomponent = ({ children }) => <p><code>{children}</code> subcomponent</p>;

const App = () => (
  <>
    <Nav>{"<Nav>"}</Nav>

    <div className="container">
      <ActionButton />
      <Badge />
      <BooleanField />
      <Button />
      <Calendar />
      <CentsField />
      <Checklist />
      <Checkmark />
      <Cheer />
      <CheerButton />

      <Heading>Circles</Heading>
      <p>The CultureHQ circles. (Try hovering.)</p>
      <PropList>
        <ClassNameProp />
      </PropList>

      <Circles />

      <Heading>ClickClose</Heading>
      <p>A component for closing something when a click event occurs outside the component.</p>
      <PropList>
        <Prop name="children">the inside of the listener</Prop>
        <ClassNameProp />
        <Prop name={"component = \"div\""}>the component used to wrap the children</Prop>
        <Prop name="onClose">the callback for when the click event occurs</Prop>
      </PropList>

      <ClickCloseContainer />

      <Heading>Confirm</Heading>
      <p>A confirmation dialog. It has the same props as the <code>Modal</code>{" "} component below, in addition to:</p>
      <PropList>
        <Prop name={"accept = \"Yes\""}>the text used for the accept button</Prop>
        <Prop name="danger = false">indicates that the accept action is permanent</Prop>
        <Prop name="onAccept">a callback when the action has been accepted</Prop>
      </PropList>

      <Confirm
        accept="Yes, create it!"
        onAccept={onAccept}
        trigger={onTrigger => <ButtonComp onClick={onTrigger}>Create</ButtonComp>}
      >
        Are you sure you&#39;d like to create this resource?
      </Confirm>

      <Heading>ConfirmDelete</Heading>
      <p>
        A variation of a <code>Confirm</code> that is marked as dangerous{" "}
        with a <code>Delete</code> button by default. Accepts all of the same{" "}
        props as <code>Confirm</code>.
      </p>

      <ConfirmDelete
        onAccept={onAccept}
        trigger={onTrigger => <ButtonComp danger onClick={onTrigger}>Danger</ButtonComp>}
      >
        Are you sure you&#39;d like to delete this resource?
      </ConfirmDelete>

      <Heading>DateTimeField</Heading>
      <p>A form field for selecting a date and time.</p>
      <PropList>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the input field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form>
            <DateTimeField name="datetime" required>Date/Time</DateTimeField>
          </Form>
        </Panel.Body>
      </Panel>

      <Heading>DoorEffect</Heading>
      <p>
        A component that wraps something that can be open and closed. When
        triggered to open with the <code>open</code> prop, it will add
        <code>{"{className}-open"}</code> to the wrapping component, and when
        closed it will add <code>{"{className}-closed"}</code> to the wrapping
        component. This allows for the common pattern of a CSS animation, and
        then reversing the direction on close.
      </p>
      <PropList>
        <ClassNameProp />
        <Prop name="duration = 150">how long the animation lasts (in ms)</Prop>
        <Prop name="open = false">whether or not the component is currently open</Prop>
        <Prop name={"tag = \"div\""}>the tag type for the container</Prop>
      </PropList>

      <DoorEffectContainer />

      <Heading>EmailField</Heading>
      <p>A string form field that accepts an email.</p>
      <PropList>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the input field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form>
            <EmailField name="email" required>Email</EmailField>
          </Form>
        </Panel.Body>
      </Panel>

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
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the file field</Prop>
        <Prop name="multiple = false">whether or not this field accepts multiple files</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the file field</Prop>
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

      <Heading>ImageEditor</Heading>
      <p>Edits an image.</p>
      <PropList>
        <Prop name="aspectRatio = null">the enforced aspect ratio on the cropper</Prop>
        <Prop name="image">an image object</Prop>
        <Prop name="onEdit">a callback for when the image has been saved</Prop>
        <Prop name="onFailure">a callback for when the image fails to load</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <ImageEditorContainer />
        </Panel.Body>
      </Panel>

      <Heading>ImageField</Heading>
      <p>An image form component.</p>
      <PropList>
        <Prop name="aspectRatio = null">the enforced aspect ratio on the cropper</Prop>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="name">the name of the field</Prop>
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the file field</Prop>
        <Prop name="progress?">a number out of 100 that represents the upload progress</Prop>
        <Prop name="value?">the value of the file field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form initialValues={{ image: "culture.png" }}>
            <ImageField name="image">Image</ImageField>
          </Form>
        </Panel.Body>
      </Panel>

      <Heading>ImagePreview</Heading>
      <p>A preview of an image file. Used to preview files before they are uploaded.</p>
      <PropList>
        <Prop name="image">the file object used to contain the image</Prop>
        <Prop name="preview">a URL representing the file (usually obtained through <code>URL.createObjectURL</code>)</Prop>
      </PropList>

      <Panel>
        <Panel.Body className="min-height">
          <ImagePreview preview="culture.png" />
        </Panel.Body>
      </Panel>

      <Heading>Info</Heading>
      <p>Displays a informational message.</p>
      <PropList>
        <Prop name="children">displayed inside the box</Prop>
        <ClassNameProp />
      </PropList>

      <Info>This is an info.</Info>

      <Heading>Loader</Heading>
      <p>
        A component that waits for something to be loaded, and displays a{" "}
        spinner if it takes too long to load.
      </p>
      <PropList>
        <Prop name="children">the components to display once <code>loading</code> is false</Prop>
        <Prop name="loading">whether or not <code>loading</code> is taking place</Prop>
      </PropList>

      <LoaderContainer />

      <Heading>Modal</Heading>
      <p>
        A wrapper around <code>ModalDialog</code> that maintains the state of{" "}
        whether or not the dialog is currently open. It provides a <code>trigger</code>{" "}
        render function that allows the consumer to define how it gets triggered.
      </p>
      <p>
        This component has the same subcomponents as the <code>Panel</code>{" "}
        component, just namespaced under the <code>Modal</code> component,{" "}
        e.g., <code>Modal.Heading</code>. It has the same props as the{" "}
        <code>ModalDialog</code> component below, in addition to:
      </p>
      <PropList>
        <Prop name="onClose">called when the modal is closed</Prop>
        <Prop name="startOpen = false">indicates that the dialog should be open when rendered</Prop>
        <Prop name="trigger">
          a function that accepts as one argument an <code>onTrigger</code>{" "}
          function and returns a valid React component
        </Prop>
      </PropList>

      <Modal
        entrance="slideIn"
        trigger={onTrigger => <ButtonComp onClick={onTrigger}>slideIn modal</ButtonComp>}
      >
        <Modal.Heading>Chapter 1</Modal.Heading>
        <Modal.Body>{TEXT}</Modal.Body>
      </Modal>
      {" "}
      <Modal
        entrance="zoomIn"
        trigger={onTrigger => <ButtonComp onClick={onTrigger}>zoomIn modal</ButtonComp>}
      >
        <Modal.Heading>Chapter 2</Modal.Heading>
        <Modal.LoaderBody loading />
      </Modal>
      {" "}
      <Modal
        trigger={onTrigger => <ButtonComp onClick={onTrigger}>narrow modal</ButtonComp>}
        width="narrow"
      >
        <Modal.Heading>Chapter 3</Modal.Heading>
        <Modal.LoaderBody loading />
      </Modal>

      <Heading>ModalDialog</Heading>
      <p>
        An accessible modal dialog wrapping <code>react-modal</code>. Note{" "}
        that if this component is going to be used, you need to call{" "}
        <code>ModalDialog.setAppElement(&quot;selector&quot;)</code> where{" "}
        <code>selector</code> is a valid HTML element selector representing{" "}
        the root of the React tree.
      </p>
      <p>
        This component has the same subcomponents as the <code>Panel</code>{" "}
        component, just namespaced under the <code>ModalDialog</code> component,{" "}
        e.g., <code>ModalDialog.Heading</code>.
      </p>
      <PropList>
        <Prop name="children">the contents of the modal dialog</Prop>
        <ClassNameProp />
        <Prop name={"entrance = \"slideIn\""}>
          the entrance animation for the dialog, must be one of{" "}
          <code>slideIn</code> or <code>zoomIn</code>
        </Prop>
        <Prop name="onClose">a callback function when the dialog is closed</Prop>
        <Prop name="width">the width of the modal window, either <code>narrow</code> or <code>normal</code></Prop>
      </PropList>

      <Heading>MultiImageField</Heading>
      <p>An image field component for selecting multiple images.</p>
      <PropList>
        <Prop name="aspectRatio = null">the enforced aspect ratio on the cropper</Prop>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="name">the name of the field</Prop>
        <Prop name="onChange?">a function that accepts an argument that represents the array of files</Prop>
        <Prop name="value?">the value of the file field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form>
            <MultiImageField name="images">Images</MultiImageField>
          </Form>
        </Panel.Body>
      </Panel>

      <Heading>Nav</Heading>
      <p>
        A top-level nav that displays at the top of the page. It hides when{" "}
        you scroll down and shows when you scroll up. (Displayed above.)
      </p>
      <PropList>
        <Prop name="children">the components to display inside the nav</Prop>
        <ClassNameProp />
      </PropList>

      <Heading>NumberField</Heading>
      <p>A number form field.</p>
      <PropList>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the input field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form>
            <NumberField name="number" required>Number</NumberField>
          </Form>
        </Panel.Body>
      </Panel>

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
          <code>Panel.Heading</code>, <code>Panel.Body</code>,{" "}
          <code>Panel.LoaderBody</code>, or <code>Panel.Footer</code>
        </Prop>
        <ClassNameProp />
        <Prop name="limitWidth = false">whether or not to apply a maximum width and center the panel</Prop>
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

      <Panel limitWidth>
        <Panel.Body>A limited width panel.</Panel.Body>
      </Panel>

      <Heading>PasswordField</Heading>
      <p>A password form field.</p>
      <PropList>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the input field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form>
            <PasswordField name="password" required>Password</PasswordField>
          </Form>
        </Panel.Body>
      </Panel>

      <Heading>PlainButton</Heading>
      <p>
        A <code>button</code> that has all of its styles reset. Useful for when
        you want to maintain adherence to semantics and a11y but effectively
        just want to capture an event interaction.
      </p>
      <PropList>
        <Prop name="children">the contents of the button</Prop>
        <ClassNameProp />
      </PropList>

      <PlainButton onClick={onClick}>
        Click me
      </PlainButton>

      <Heading>SearchBar</Heading>
      <p>A search bar that throttles the searches so it does not fire too quickly.</p>
      <PropList>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <ClassNameProp />
        <Prop name="onSearch">a callback prop for when a search has been triggered</Prop>
        <Prop name="onSearchChange?">a callback prop for when the search bar changes text</Prop>
        <Prop name={"placeholder = \"\""}>a placeholder for the search bar</Prop>
        <Prop name="throttle = 300">how fast to allow searches to happen (in ms)</Prop>
      </PropList>

      <SearchBarContainer />

      <Heading>SelectField</Heading>
      <p>A select form field.</p>
      <PropList>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="creatable = false">whether or not new options could be created</Prop>
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="multiple = false">whether or not to accept multiple values</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the select field - should be a nullable array if multiple is set</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form
            initialValues={{
              select: OPTIONS[0].value,
              "select-cr": OPTIONS[1].value,
              "select-ml": [OPTIONS[2].value, OPTIONS[3].value],
              "select-cr-ml": [OPTIONS[4].value, OPTIONS[5].value]
            }}
          >
            <SelectField name="select" options={OPTIONS} required>Select</SelectField>
            <SelectField name="select-cr" options={OPTIONS} creatable required>
              Select (Creatable)
            </SelectField>
            <SelectField name="select-ml" options={OPTIONS} multiple required>
              Select (Multiple)
            </SelectField>
            <SelectField name="select-cr-ml" options={OPTIONS} creatable multiple required>
              Select (Creatable, Multiple)
            </SelectField>
          </Form>
        </Panel.Body>
      </Panel>

      <Heading>Spinner</Heading>
      <p>A circular spinner using the CultureHQ colors.</p>
      <PropList>
        <ClassNameProp />
      </PropList>

      <Spinner />

      <Heading>StringField</Heading>
      <p>A string form field.</p>
      <PropList>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the input field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form>
            <StringField name="string" required>String</StringField>
          </Form>
        </Panel.Body>
      </Panel>

      <Heading>SubmitButton</Heading>
      <p>
        A button used to submit a form. Accepts all of the same props as a{" "}
        regular <code>Button</code> component, with the addition of:
      </p>
      <PropList>
        <Prop name="children?">
          a function that accepts a single argument (<code>submitting</code>){" "}
          that should return valid React children depending on that boolean argument
        </Prop>
        <Prop name="submitting">a boolean value representing whether or not the form is currently submitting</Prop>
      </PropList>

      <Form onSubmit={onSubmit}>
        <SubmitButton primary />
      </Form>

      <Heading>Subnav</Heading>
      <p>
        A navigation menu for within the application. Can function as{" "}
        either a controlled component or an uncontrolled component.
      </p>
      <PropList>
        <Prop name="activeIndex?">
          an integer that represents the index of the child that is currently{" "}
          active, passed if you want to use this component as a controlled component
        </Prop>
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

      <Heading>Table</Heading>
      <p>Displays a table.</p>
      <PropList>
        <Prop name="children">displays inside the table</Prop>
        <ClassNameProp />
      </PropList>

      <Panel>
        <Panel.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Chapters</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>The Sorcerer&#39;s Stone</td>
                <td>17</td>
              </tr>
              <tr>
                <td>2</td>
                <td>The Chamber of Secrets</td>
                <td>18</td>
              </tr>
              <tr>
                <td>3</td>
                <td>The Prisoner of Azkaban</td>
                <td>22</td>
              </tr>
              <tr>
                <td>4</td>
                <td>The Goblet of Fire</td>
                <td>37</td>
              </tr>
              <tr>
                <td>5</td>
                <td>The Order of the Phoenix</td>
                <td>38</td>
              </tr>
              <tr>
                <td>6</td>
                <td>The Half-Blood Prince</td>
                <td>30</td>
              </tr>
              <tr>
                <td>7</td>
                <td>The Deathly Hallows</td>
                <td>37</td>
              </tr>
            </tbody>
          </Table>
        </Panel.Body>
      </Panel>

      <Heading>Tag</Heading>
      <p>A component for displaying an associated status.</p>
      <PropList>
        <Prop name="children">displayed inside the tag</Prop>
        <ClassNameProp />
        <Prop name={"color = \"blue\""}>can be one of <code>blue</code>, <code>gray</code>, or <code>red</code></Prop>
      </PropList>

      <Tag>Blue</Tag>
      <Tag color="gray">Gray</Tag>
      <Tag color="red">Red</Tag>

      <Heading>TextField</Heading>
      <p>A text form field.</p>
      <PropList>
        <Prop name="autoFocus = false">whether or not the component should request focus on initial mount</Prop>
        <Prop name="children">the label to display for the field</Prop>
        <ClassNameProp />
        <Prop name="onChange?">a function that accepts one argument that represents the new value of the input field</Prop>
        <Prop name="name">the name of the field</Prop>
        <Prop name="required?">indicates this field is required for submission</Prop>
        <Prop name="validator?">a function that should either return an error message string or <code>null</code></Prop>
        <Prop name="value?">the value of the input field</Prop>
      </PropList>

      <Panel>
        <Panel.Body>
          <Form>
            <TextField name="text" required>Text</TextField>
          </Form>
        </Panel.Body>
      </Panel>

      <Heading>Thumbnail</Heading>
      <p>A small image that should be displayed inline.</p>
      <PropList>
        <ClassNameProp />
        <Prop name="image">the image to be displayed</Prop>
        <Prop name={"size = \"small\""}>can be on of <code>small</code>, <code>medium</code>, or <code>large</code></Prop>
        <Prop name="square = false">whether or not this image should be displayed as a square</Prop>
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

      <Tooltip tip={TEXT}>
        <ButtonComp primary disabled>Some action</ButtonComp>
      </Tooltip>

      <Heading>Warning</Heading>
      <p>Displays a warning message.</p>
      <PropList>
        <Prop name="children">displayed inside the box</Prop>
        <ClassNameProp />
      </PropList>

      <Warning>This is a warning.</Warning>
    </div>
  </>
);

export default App;
