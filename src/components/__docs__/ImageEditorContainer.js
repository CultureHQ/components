import React, { Component } from "react";

import ImageEditor from "../ImageEditor";
import Panel from "../Panel";

class ImageEditorContainer extends Component {
  state = { image: false };

  componentDidMount() {
    const image = new Image();

    image.src = "culture.png";
    image.onload = () => {
      this.setState({ image });
    };
  }

  handleEdit = () => {
    alert("Edited!"); // eslint-disable-line no-alert
  };

  render() {
    const { image } = this.state;

    return (
      <Panel>
        <Panel.Body>
          {image && <ImageEditor image={image.src} onEdit={this.handleEdit} />}
        </Panel.Body>
      </Panel>
    );
  }
}

export default ImageEditorContainer;
