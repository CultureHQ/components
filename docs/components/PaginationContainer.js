import React, { Component } from "react";

import { Pagination } from "../../src";

class PaginationContainer extends Component {
  state = { currentPage: 1 };

  handleClick = currentPage => {
    this.setState({ currentPage });
  };

  render() {
    const { totalPages } = this.props;
    const { currentPage } = this.state;

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onClick={this.handleClick}
      />
    );
  }
}

export default PaginationContainer;
