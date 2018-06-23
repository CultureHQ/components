import React, { Component } from "react";
import styled from "styled-components";

import { colors } from "../common.json";

const NavContainer = styled.nav`
  margin-bottom: 15px;
`;

const defaultTheme = {
  borderBottom: "none",
  borderRadius: "4px",
  color: colors.primaryLightFont
};

const activeTheme = {
  borderBottom: `2px solid ${colors.primaryGreen}`,
  borderRadius: "0",
  color: colors.primaryGreen
};

const ItemContainer = styled.a`
  border-bottom: ${props => props.theme.borderBottom};
  border-radius: ${props => props.theme.borderRadius};
  color: ${props => props.theme.color};
  cursor: pointer;
  padding: 4px 5px;
  text-decoration: none;

  &:hover {
    background-color: ${colors.border};
    color: ${props => props.theme.color};
    text-decoration: none;
  }

  & + a {
    margin-left: 10px;
  }
`;

class Subnav extends Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: props.activeIndex || 0 };
  }

  handleClick(activeIndex) {
    this.setState(prevState => {
      if (prevState.activeIndex !== activeIndex) {
        if (this.props.onChange) {
          this.props.onChange(activeIndex);
        }

        return { activeIndex };
      }
      return null;
    });
  }

  render() {
    const { children, onChange, ...otherProps } = this.props;
    const { activeIndex } = this.state;

    return (
      <NavContainer {...otherProps}>
        {React.Children.map(children, (child, index) => (
          React.cloneElement(child, {
            active: index === activeIndex,
            onClick: () => this.handleClick(index)
          })
        ))}
      </NavContainer>
    );
  }
}

Subnav.Item = ({
  to, active, children, ...props
}) => (
  <ItemContainer
    theme={active ? activeTheme : defaultTheme}
    href={to}
    active={active}
    {...props}
  >
    {children}
  </ItemContainer>
);

export default Subnav;
