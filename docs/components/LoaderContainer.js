import React, { Component } from "react";

import { Button, Loader } from "../../src";

class LoaderContainer extends Component {
  state = { loading: true };

  handleContentToggle = () => {
    this.setState(({ loading }) => ({ loading: !loading }));
  };

  render() {
    const { loading } = this.state;

    return (
      <>
        <Button onClick={this.handleContentToggle}>
          {loading ? "Load" : "Unload"} content
        </Button>
        <Loader loading={loading}>
          <p>Content loaded!</p>
        </Loader>
      </>
    );
  }
}

export default LoaderContainer;
