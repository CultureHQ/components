import React, { useState, useCallback, useEffect } from "react";
import { Router, Link, Location } from "@reach/router";

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
import Circles from "./pages/Circles";
import ClickClose from "./pages/ClickClose";
import Confirm from "./pages/Confirm";
import ConfirmDelete from "./pages/ConfirmDelete";
import DateTimeField from "./pages/DateTimeField";
import DoorEffect from "./pages/DoorEffect";
import EmailField from "./pages/EmailField";
import FeedItem from "./pages/FeedItem";
import FileField from "./pages/FileField";
import Form from "./pages/Form";
import Hamburger from "./pages/Hamburger";
import Icon from "./pages/Icon";
import ImageEditor from "./pages/ImageEditor";
import ImageField from "./pages/ImageField";
import ImagePreview from "./pages/ImagePreview";
import Info from "./pages/Info";
import Loader from "./pages/Loader";
import Modal from "./pages/Modal";
import ModalDialog from "./pages/ModalDialog";
import MultiImageField from "./pages/MultiImageField";
import Nav from "./pages/Nav";
import NumberField from "./pages/NumberField";
import Pagination from "./pages/Pagination";
import Panel from "./pages/Panel";
import PasswordField from "./pages/PasswordField";
import PlainButton from "./pages/PlainButton";
import SearchBar from "./pages/SearchBar";
import SelectField from "./pages/SelectField";
import Spinner from "./pages/Spinner";
import StringField from "./pages/StringField";
import SubmitButton from "./pages/SubmitButton";
import Subnav from "./pages/Subnav";
import Success from "./pages/Success";
import Table from "./pages/Table";
import Tag from "./pages/Tag";
import TextField from "./pages/TextField";
import Thumbnail from "./pages/Thumbnail";
import Tooltip from "./pages/Tooltip";
import Warning from "./pages/Warning";

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
