import React from "react";
import ReactDOM from "react-dom";

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

import { Modal as ModalSrc, Nav as NavSrc } from "../src/components";
import "../src/styles/app.scss";

ModalSrc.setAppElement("#main");

const Components = () => (
  <>
    <NavSrc>@culturehq/components</NavSrc>
    <main>
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
      <Circles />
      <ClickClose />
      <Confirm />
      <ConfirmDelete />
      <DateTimeField />
      <DoorEffect />
      <EmailField />
      <FeedItem />
      <FileField />
      <Form />
      <Hamburger />
      <Icon />
      <ImageEditor />
      <ImageField />
      <ImagePreview />
      <Info />
      <Loader />
      <Modal />
      <ModalDialog />
      <Nav />
      <NumberField />
      <Pagination />
      <Panel />
      <PasswordField />
      <PlainButton />
      <SearchBar />
      <SelectField />
      <Spinner />
      <StringField />
      <SubmitButton />
      <Subnav />
      <Success />
      <Table />
      <Tag />
      <TextField />
      <Thumbnail />
      <TimezoneField />
      <Tooltip />
      <Warning />
    </main>
    {ReactDOM.createPortal(
      <footer>
        <p>
          Copyright (c) 2018 CultureHQ
          <br />
          <a href="https://github.com/CultureHQ/components">
            github.com/CultureHQ/components
          </a>
          <br />
          <a href="https://engineering.culturehq.com">
            engineering.culturehq.com
          </a>
        </p>
      </footer>,
      document.body
    )}
  </>
);

export default Components;
