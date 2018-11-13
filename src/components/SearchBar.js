import React, { Component } from "react";

import classnames from "../classnames";
import Icon from "./Icon";

class SearchBar extends Component {
  static defaultProps = {
    autoFocus: false,
    onSearchChange: () => {},
    placeholder: "",
    throttle: 300
  };

  inputRef = React.createRef();

  timeout = 0;

  state = { search: "" };

  componentDidMount() {
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.inputRef.current.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { onSearch, throttle } = this.props;
    const { search } = this.state;

    if (search !== prevState.search) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      if (search) {
        this.timeout = setTimeout(() => onSearch(search), throttle);
      } else {
        onSearch(search);
      }
    }
  }

  handleChange = ({ target: { value: search } }) => {
    const { onSearchChange } = this.props;

    onSearchChange(search);

    this.setState({ search });
  };

  render() {
    const { className, placeholder } = this.props;
    const { search } = this.state;

    return (
      <div className={classnames("chq-sbar", className)}>
        <Icon icon="ios-search-strong" />
        <input
          ref={this.inputRef}
          aria-label="Search"
          type="search"
          name="search"
          value={search}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default SearchBar;
