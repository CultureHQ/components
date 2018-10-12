import React, { Component } from "react";

import { ImageEditor } from "../../src";

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

    if (!image) {
      return null;
    }

    return <ImageEditor image={image.src} onEdit={this.handleEdit} />;
  }
}

export default ImageEditorContainer;
