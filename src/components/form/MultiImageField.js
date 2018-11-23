import React, { Component } from "react";

import classnames from "../../classnames";

import Icon from "../Icon";
import ImageEditor from "../ImageEditor";
import ImagePreview from "../ImagePreview";
import Table from "../Table";
import ActionButton from "../buttons/ActionButton";
import ModalDialog from "../modals/ModalDialog";
import { withForm } from "./Form";
import getHumanSize from "../../utils/get-human-size";

const hashTransports = transports => transports.map(({ key }) => key).join(",");

export class Transport {
  constructor(file) {
    this.file = file;
    this.name = file.name;
    this.key = `${file.name}-${+new Date()}`;
    this.preview = URL.createObjectURL(file);
  }

  get size() {
    return getHumanSize(this.file.size);
  }

  mutate(file) {
    const transport = new Transport(file);
    transport.name = this.name;
    return transport;
  }
}

const Preview = ({ transport, onEdit, onRemove }) => (
  <tr>
    <td>
      <ImagePreview image={transport.file} preview={transport.preview} />
    </td>
    <td>
      {transport.name}
    </td>
    <td>
      {transport.size}
    </td>
    <td>
      <div>
        <ActionButton icon="edit" onClick={() => onEdit(transport.key)}>
          Edit
        </ActionButton>
        {" "}
        <ActionButton icon="trash-a" onClick={() => onRemove(transport.key)}>
          Remove
        </ActionButton>
      </div>
    </td>
  </tr>
);

class MultiImageField extends Component {
  static defaultProps = {
    aspectRatio: null,
    autoFocus: false,
    onChange: () => {},
    onFormChange: () => {},
    values: {}
  };

  inputRef = React.createRef();

  state = {
    currentTransport: null,
    editorOpen: false,
    transports: []
  };

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.inputRef.current.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { name, onChange, onFormChange } = this.props;
    const { transports: nextTransports } = this.state;

    if (hashTransports(nextTransports) !== hashTransports(prevState.transports)) {
      const files = nextTransports.map(({ file }) => file);

      onChange(files);
      onFormChange(name, files);
    }
  }

  handleFilesSelected = ({ target: { files } }) => {
    this.setState(({ transports }) => ({
      editorOpen: false,
      currentTransport: null,
      transports: [
        ...transports,
        ...Array.from(files).map(file => new Transport(file))
      ]
    }));
  };

  handleImageRemove = transportKey => {
    this.setState(({ transports }) => ({
      transports: transports.filter(transport => transport.key !== transportKey)
    }));
  };

  handleImageEdit = transportKey => {
    this.setState(({ transports }) => ({
      editorOpen: true,
      currentTransport: transports.find(transport => transport.key === transportKey)
    }));
  };

  handleImageEdited = image => {
    this.setState(({ currentTransport, transports }) => ({
      editorOpen: false,
      currentTransport: null,
      transports: transports.map(transport => (
        transport.key === currentTransport.key ? transport.mutate(image) : transport
      ))
    }));
  };

  handleImageFailure = () => {
    this.setState(({ currentTransport, transports }) => ({
      editorOpen: false,
      currentTransport: null,
      transports: transports.filter(transport => transport.key !== currentTransport.key)
    }));
  };

  handleClose = () => {
    this.setState({ editorOpen: false });
  };

  handleClick = () => {
    this.inputRef.current.value = null;
  };

  render() {
    const {
      aspectRatio, autoFocus, children, className, errors, name, onChange,
      onError, onFormChange, progress, submitted, submitting, value, values,
      ...props
    } = this.props;

    const { editorOpen, currentTransport, transports } = this.state;

    return (
      <>
        <label className={classnames("chq-ffd", className)} htmlFor={name}>
          <span className="chq-ffd--lb">{children}</span>
          <div className="chq-ffd--im">
            <div className="chq-ffd--im--ph">
              <Icon icon="images" />
            </div>
            <div className="chq-ffd--im--bt">
              <Icon icon="ios-cloud-upload-outline" />
              {" "}
              Upload images
            </div>
            <input
              ref={this.inputRef}
              accept="image/*"
              multiple
              type="file"
              onClick={this.handleClick}
              onChange={this.handleFilesSelected}
              {...props}
              id={name}
              name={name}
            />
          </div>
        </label>
        {transports.length > 0 && (
          <Table className="chq-mif">
            <tbody>
              {transports.map(transport => (
                <Preview
                  key={transport.key}
                  transport={transport}
                  onEdit={this.handleImageEdit}
                  onRemove={this.handleImageRemove}
                />
              ))}
            </tbody>
          </Table>
        )}
        {editorOpen && currentTransport && (
          <ModalDialog onClose={this.handleClose}>
            <ModalDialog.Body>
              <ImageEditor
                aspectRatio={aspectRatio}
                image={currentTransport.preview}
                onEdit={this.handleImageEdited}
                onFailure={this.handleImageFailure}
              />
            </ModalDialog.Body>
          </ModalDialog>
        )}
      </>
    );
  }
}

export default withForm(MultiImageField);
