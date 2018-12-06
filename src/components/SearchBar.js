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
    this.componentIsMounted = true;
    const { autoFocus } = this.props;

    if (autoFocus) {
      this.inputRef.current.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { onSearch, throttle } = this.props;
    const { search } = this.state;

    if (search !== prevState.search) {
      clearTimeout(this.timeout);

      if (search) {
        const performSearch = () => (onSearch(search) || Promise.resolve()).then(() => {
          if (this.componentIsMounted) {
            this.setState({ searching: false });
          }
        });

        if (throttle) {
          this.timeout = setTimeout(performSearch, throttle);
        } else {
          performSearch();
        }
      } else {
        onSearch(search);
      }
    }
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
    clearTimeout(this.timeout);
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
