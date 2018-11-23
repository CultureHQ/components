import React, { useState, useCallback, useEffect } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { Router, Link, Location } from "@reach/router";

import Calendar from "../../src/components/__docs__/Calendar";
import Checklist from "../../src/components/__docs__/Checklist";
import Checkmark from "../../src/components/__docs__/Checkmark";
import Cheer from "../../src/components/__docs__/Cheer";
import Circles from "../../src/components/__docs__/Circles";
import ClickClose from "../../src/components/__docs__/ClickClose";
import DoorEffect from "../../src/components/__docs__/DoorEffect";
import FeedItem from "../../src/components/__docs__/FeedItem";
import Icon from "../../src/components/__docs__/Icon";
import ImageEditor from "../../src/components/__docs__/ImageEditor";
import ImagePreview from "../../src/components/__docs__/ImagePreview";
import Info from "../../src/components/__docs__/Info";
import Loader from "../../src/components/__docs__/Loader";
import Nav from "../../src/components/__docs__/Nav";
import Pagination from "../../src/components/__docs__/Pagination";
import Panel from "../../src/components/__docs__/Panel";
import SearchBar from "../../src/components/__docs__/SearchBar";
import Spinner from "../../src/components/__docs__/Spinner";
import Subnav from "../../src/components/__docs__/Subnav";
import Success from "../../src/components/__docs__/Success";
import Table from "../../src/components/__docs__/Table";
import Tag from "../../src/components/__docs__/Tag";
import Thumbnail from "../../src/components/__docs__/Thumbnail";
import Tooltip from "../../src/components/__docs__/Tooltip";
import Warning from "../../src/components/__docs__/Warning";

import ActionButton from "../../src/components/buttons/__docs__/ActionButton";
import Badge from "../../src/components/buttons/__docs__/Badge";
import Button from "../../src/components/buttons/__docs__/Button";
import CheerButton from "../../src/components/buttons/__docs__/CheerButton";
import Hamburger from "../../src/components/buttons/__docs__/Hamburger";
import PlainButton from "../../src/components/buttons/__docs__/PlainButton";

import BooleanField from "./pages/BooleanField";
import CentsField from "./pages/CentsField";
import Confirm from "./pages/Confirm";
import ConfirmDelete from "./pages/ConfirmDelete";
import DateTimeField from "./pages/DateTimeField";
import EmailField from "./pages/EmailField";
import FileField from "./pages/FileField";
import Form from "./pages/Form";
import ImageField from "./pages/ImageField";
import Modal from "./pages/Modal";
import ModalDialog from "./pages/ModalDialog";
import MultiImageField from "./pages/MultiImageField";
import NumberField from "./pages/NumberField";
import PasswordField from "./pages/PasswordField";
import SelectField from "./pages/SelectField";
import StringField from "./pages/StringField";
import SubmitButton from "./pages/SubmitButton";
import TextField from "./pages/TextField";

import {
  ActionButton as ActionButtonSrc,
  DoorEffect as DoorEffectSrc,
  Modal as ModalSrc,
  Panel as PanelSrc
} from "../../src";

import "../../src/styles/app.scss";

ModalSrc.setAppElement("#main");

const Header = ({ location }) => {
  const [navOpen, setNavOpen] = useState(false);
  const onNavToggle = useCallback(() => setNavOpen(state => !state));

  useEffect(() => setNavOpen(false), [location]);

  return (
    <>
      <header>
        <h1>@culturehq/components</h1>
        <ActionButtonSrc onClick={onNavToggle}>
          Components
        </ActionButtonSrc>
      </header>
      <DoorEffectSrc className="nav" open={navOpen} duration={300}>
        <PanelSrc>
          <PanelSrc.Body>
            <Link to="/action-button">ActionButton</Link>
            <Link to="/badge">Badge</Link>
            <Link to="/boolean-field">BooleanField</Link>
            <Link to="/button">Button</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/cents-field">CentsField</Link>
            <Link to="/checklist">Checklist</Link>
            <Link to="/checkmark">Checkmark</Link>
            <Link to="/cheer">Cheer</Link>
            <Link to="/cheer-button">CheerButton</Link>
            <Link to="/circles">Circles</Link>
            <Link to="/click-close">ClickClose</Link>
            <Link to="/confirm">Confirm</Link>
            <Link to="/confirm-delete">ConfirmDelete</Link>
            <Link to="/date-time-field">DateTimeField</Link>
            <Link to="/door-effect">DoorEffect</Link>
            <Link to="/email-field">EmailField</Link>
            <Link to="/feed-item">FeedItem</Link>
            <Link to="/file-field">FileField</Link>
            <Link to="/form">Form</Link>
            <Link to="/hamburger">Hamburger</Link>
            <Link to="/icon">Icon</Link>
            <Link to="/image-editor">ImageEditor</Link>
            <Link to="/image-field">ImageField</Link>
            <Link to="/image-preview">ImagePreview</Link>
            <Link to="/info">Info</Link>
            <Link to="/loader">Loader</Link>
            <Link to="/modal">Modal</Link>
            <Link to="/modal-dialog">ModalDialog</Link>
            <Link to="/multi-image-field">MultiImageField</Link>
            <Link to="/nav">Nav</Link>
            <Link to="/number-field">NumberField</Link>
            <Link to="/pagination">Pagination</Link>
            <Link to="/panel">Panel</Link>
            <Link to="/password-field">PasswordField</Link>
            <Link to="/plain-button">PlainButton</Link>
            <Link to="/search-bar">SearchBar</Link>
            <Link to="/select-field">SelectField</Link>
            <Link to="/spinner">Spinner</Link>
            <Link to="/string-field">StringField</Link>
            <Link to="/submit-button">SubmitButton</Link>
            <Link to="/subnav">Subnav</Link>
            <Link to="/success">Success</Link>
            <Link to="/table">Table</Link>
            <Link to="/tag">Tag</Link>
            <Link to="/text-field">TextField</Link>
            <Link to="/thumbnail">Thumbnail</Link>
            <Link to="/tooltip">Tooltip</Link>
            <Link to="/warning">Warning</Link>
          </PanelSrc.Body>
        </PanelSrc>
      </DoorEffectSrc>
    </>
  );
};

const Body = ({ location }) => (
  <Router location={location}>
    <ActionButton path="/action-button" />
    <Badge path="/badge" />
    <BooleanField path="/boolean-field" />
    <Button path="/button" />
    <Calendar path="/calendar" />
    <CentsField path="/cents-field" />
    <Checklist path="/checklist" />
    <Checkmark path="/checkmark" />
    <Cheer path="/cheer" />
    <CheerButton path="/cheer-button" />
    <Circles path="/circles" />
    <ClickClose path="/click-close" />
    <Confirm path="/confirm" />
    <ConfirmDelete path="/confirm-delete" />
    <DateTimeField path="/date-time-field" />
    <DoorEffect path="/door-effect" />
    <EmailField path="/email-field" />
    <FeedItem path="/feed-item" />
    <FileField path="/file-field" />
    <Form path="/form" />
    <Hamburger path="/hamburger" />
    <Icon path="/icon" />
    <ImageEditor path="/image-editor" />
    <ImageField path="/image-field" />
    <ImagePreview path="/image-preview" />
    <Info path="/info" />
    <Loader path="/loader" />
    <Modal path="/modal" />
    <ModalDialog path="/modal-dialog" />
    <MultiImageField path="/multi-image-field" />
    <Nav path="/nav" />
    <NumberField path="/number-field" />
    <Pagination path="/pagination" />
    <Panel path="/panel" />
    <PasswordField path="/password-field" />
    <PlainButton path="/plain-button" />
    <SearchBar path="/search-bar" />
    <SelectField path="/select-field" />
    <Spinner path="/spinner" />
    <StringField path="/string-field" />
    <SubmitButton path="/submit-button" />
    <Subnav path="/subnav" />
    <Success path="/success" />
    <Table path="/table" />
    <Tag path="/tag" />
    <TextField path="/text-field" />
    <Thumbnail path="/thumbnail" />
    <Tooltip path="/tooltip" />
    <Warning path="/warning" />
  </Router>
);

const App = () => (
  <Location>
    {({ location }) => (
      <main>
        <Header location={location} />
        <Body location={location} />
      </main>
    )}
  </Location>
);

export default App;
