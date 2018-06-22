import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";

import Icon from "./Icon";

import { colors } from "../common.json";

const styles = {
  horizontalPadding: 5,
  verticalPadding: 10,
  lightenedGreen: '#89ba8d',
  darkenedGreen: '#69a86d'
};

const horizontalPaddingFrom = ({ primary, small }) => {
  if (primary) {
    return styles.horizontalPadding + 4;
  }
  if (small) {
    return styles.horizontalPadding - 3;
  }
  return styles.horizontalPadding;
};

const verticalPaddingFrom = ({ primary, small }) => {
  if (primary) {
    return styles.verticalPadding + 3;
  }
  if (small) {
    return styles.verticalPadding - 3;
  }
  return styles.verticalPadding;
};

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
`;

const Container = styled.button`
  background-color: ${props => props.inverted ? "white" : colors.primaryGreen};
  border: ${colors.primaryGreen} solid 1px;
  border-radius: 5px;
  color: ${props => props.inverted ? colors.primaryGreen : "white"};
  cursor: pointer;
  display: inline-block;
  font-size: ${props => props.small ? 0.8 : 1}em;
  font-weight: 400;
  outline: 0;
  padding: ${props => horizontalPaddingFrom(props)}px ${props => verticalPaddingFrom(props)}px;

  svg {
    height: ${props => styles.verticalPadding + (props.small ? 5 : 8)}px;
    margin: 0 0 -3px -3px;
    ${props => props.loading && `animation: ${spinAnimation} 1s linear infinite;`}
  }

  path {
    fill: ${props => props.inverted ? colors.primaryGreen : "white"};
  }

  &:focus {
    background-color: ${props => props.inverted ? "white" : colors.primaryGreen};
    color: ${props => props.inverted ? colors.primaryGreen : "white"};
    text-decoration: none;
  }

  &:hover {
    background-color: ${props => props.inverted ? "white" : styles.lightenedGreen};
    border: ${styles.lightenedGreen} solid 2px;
    color: ${props => props.inverted ? styles.lightenedGreen : "white"};
    padding: ${props => horizontalPaddingFrom(props) - 1}px ${props => verticalPaddingFrom(props) - 1}px;
    text-decoration: none;

    path {
      fill: ${props => props.inverted ? styles.lightenedGreen : "white"}
    }
  }

  &:active {
    background-color: ${props => props.inverted ? "white" : styles.darkenedGreen};
    border: ${styles.darkenedGreen} solid 2px;
    color: ${props => props.inverted ? styles.darkenedGreen : "white"};
    padding: ${props => horizontalPaddingFrom(props) - 1}px ${props => verticalPaddingFrom(props) - 1}px;

    path {
      fill: ${props => props.inverted ? styles.darkenedGreen : "white"}
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: .6;
  }
`;

const Button = ({ loading, icon, children, ...props }) => (
  <Container loading={loading} {...props}>
    {loading ?
      <Fragment><Icon icon="load-c" />{" "}</Fragment> :
      icon && <Fragment><Icon icon={icon} />{" "}</Fragment>
    }
    {children}
  </Container>
);

export default Button;
