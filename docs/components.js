import React from "react";

import Calendar from "../src/components/__docs__/Calendar";
import Checklist from "../src/components/__docs__/Checklist";
import Checkmark from "../src/components/__docs__/Checkmark";
import Cheer from "../src/components/__docs__/Cheer";
import Circles from "../src/components/__docs__/Circles";
import ClickClose from "../src/components/__docs__/ClickClose";
import DoorEffect from "../src/components/__docs__/DoorEffect";
import FeedItem from "../src/components/__docs__/FeedItem";
import Icon from "../src/components/__docs__/Icon";
import ImageEditor from "../src/components/__docs__/ImageEditor";
import ImagePreview from "../src/components/__docs__/ImagePreview";
import Info from "../src/components/__docs__/Info";
import Loader from "../src/components/__docs__/Loader";
import Nav from "../src/components/__docs__/Nav";
import Pagination from "../src/components/__docs__/Pagination";
import Panel from "../src/components/__docs__/Panel";
import SearchBar from "../src/components/__docs__/SearchBar";
import Spinner from "../src/components/__docs__/Spinner";
import Subnav from "../src/components/__docs__/Subnav";
import Success from "../src/components/__docs__/Success";
import Table from "../src/components/__docs__/Table";
import Tag from "../src/components/__docs__/Tag";
import Thumbnail from "../src/components/__docs__/Thumbnail";
import Tooltip from "../src/components/__docs__/Tooltip";
import Warning from "../src/components/__docs__/Warning";

import ActionButton from "../src/components/buttons/__docs__/ActionButton";
import Badge from "../src/components/buttons/__docs__/Badge";
import Button from "../src/components/buttons/__docs__/Button";
import CheerButton from "../src/components/buttons/__docs__/CheerButton";
import Hamburger from "../src/components/buttons/__docs__/Hamburger";
import PlainButton from "../src/components/buttons/__docs__/PlainButton";

import BooleanField from "../src/components/form/__docs__/BooleanField";
import CentsField from "../src/components/form/__docs__/CentsField";
import DateTimeField from "../src/components/form/__docs__/DateTimeField";
import EmailField from "../src/components/form/__docs__/EmailField";
import FileField from "../src/components/form/__docs__/FileField";
import Form from "../src/components/form/__docs__/Form";
import ImageField from "../src/components/form/__docs__/ImageField";
import MultiImageField from "../src/components/form/__docs__/MultiImageField";
import NumberField from "../src/components/form/__docs__/NumberField";
import PasswordField from "../src/components/form/__docs__/PasswordField";
import SelectField from "../src/components/form/__docs__/SelectField";
import StringField from "../src/components/form/__docs__/StringField";
import SubmitButton from "../src/components/form/__docs__/SubmitButton";
import TextField from "../src/components/form/__docs__/TextField";
import TimezoneField from "../src/components/form/__docs__/TimezoneField";

import Confirm from "../src/components/modals/__docs__/Confirm";
import ConfirmDelete from "../src/components/modals/__docs__/ConfirmDelete";
import Modal from "../src/components/modals/__docs__/Modal";
import ModalDialog from "../src/components/modals/__docs__/ModalDialog";

import { Modal as ModalSrc, Nav as NavSrc } from "../src";
import "../src/styles/app.scss";

ModalSrc.setAppElement("#main");

const App = () => (
  <>
    <NavSrc>@culturehq/components</NavSrc>
    <main>
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
      <TimezoneField path="/timezone-field" />
      <Tooltip path="/tooltip" />
      <Warning path="/warning" />
    </main>
    <footer>
      <p>
        Copyright (c) 2018 CultureHQ<br />
        <a href="https://github.com/CultureHQ/components">github.com/CultureHQ/components</a>
      </p>
    </footer>
  </>
);

export default App;
