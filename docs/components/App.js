import React from "react";
import "../../src/styles/app.scss";

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

import { Modal as ModalComponent } from "../../src";

ModalComponent.setAppElement("#main");

const App = () => (
  <div className="container">
    <h1>@culturehq/components</h1>
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
    <MultiImageField />
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
    <Tooltip />
    <Warning />
  </div>
);

export default App;
