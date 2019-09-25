import React from "react";

import classnames from "../classnames";
import Icon from "./Icon";

type SearchBarProps = {
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  onSearch: (search: string) => void | Promise<any>;
  onSearchChange?: (search: string) => void;
  placeholder?: string;
  throttle?: null | number;
};

type SearchBarState = {
  search: string;
  searching: boolean;
};

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  static defaultProps: Partial<SearchBarProps> = {
    autoComplete: "on",
    autoFocus: false,
    placeholder: "",
    throttle: 300
  };

  private componentIsMounted = false;

  private inputRef = React.createRef<HTMLInputElement>();

  private timeout: null | number = null;

  state = { search: "", searching: false };

  componentDidMount() {
    this.componentIsMounted = true;

    const { autoFocus } = this.props;
    const input = this.inputRef.current;

    if (autoFocus && input) {
      input.focus();
    }
  }

  componentDidUpdate(prevProps: SearchBarProps, prevState: SearchBarState) {
    const { onSearch, throttle } = this.props;
    const { search } = this.state;

    if (search !== prevState.search) {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }

      if (search) {
        const performSearch = () => (onSearch(search) || Promise.resolve()).then(() => {
          if (this.componentIsMounted) {
            this.setState({ searching: false });
          }
        });

        if (throttle) {
          this.timeout = window.setTimeout(performSearch, throttle);
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

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onSearchChange } = this.props;
    const search = event.target.value;

    if (onSearchChange) {
      onSearchChange(search);
    }

    this.setState({ search, searching: search.length > 0 });
  };

  render() {
    const { className, autoComplete, placeholder } = this.props;
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
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        {searching && <Icon className="chq-sbar--spn" icon="load-c" />}
      </div>
    );
  }
}

export default SearchBar;
