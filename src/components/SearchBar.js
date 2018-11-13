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

  state = { search: "", searching: false };

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
        this.timeout = setTimeout(() => {
          (onSearch(search) || Promise.resolve()).then(() => {
            this.setState({ searching: false });
          });
        }, throttle);
      } else {
        onSearch(search);
      }
    }
  }

  handleChange = ({ target: { value: search } }) => {
    const { onSearchChange } = this.props;

    onSearchChange(search);
    this.setState({ search, searching: search.length > 0 });
  };

  render() {
    const { className, placeholder } = this.props;
    const { search, searching } = this.state;

    return (
      <div className={classnames("chq-sbar", className)}>
        <Icon className="chq-sbar--gls" icon="ios-search-strong" />
        <input
          ref={this.inputRef}
          aria-label="Search"
          type="search"
          name="search"
          value={search}
          onChange={this.handleChange}
          placeholder={placeholder}
        />
        {searching && <Icon className="chq-sbar--spn" icon="load-c" />}
      </div>
    );
  }
}

export default SearchBar;
