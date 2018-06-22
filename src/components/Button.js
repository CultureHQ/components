import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";

import Icon from "./Icon";

import { colors } from "../common.json";

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
`;

const defaultTheme = {
  activeBackgroundColor: colors.darkenedGreen,
  activeColor: "white",
  backgroundColor: colors.primaryGreen,
  color: "white",
  fontSize: "1em",
  hoverBackgroundColor: colors.lightenedGreen,
  hoverColor: "white",
  verticalPadding: 5,
  horizontalPadding: 10,
  svgAnimation: "none",
  svgHeight: 18
};

const themes = {
  inverted: {
    activeBackgroundColor: "white",
    activeColor: colors.darkenedGreen,
    backgroundColor: "white",
    color: colors.primaryGreen,
    hoverBackgroundColor: "white",
    hoverColor: colors.lightenedGreen
  },
  primary: {
    verticalPadding: 9,
    horizontalPadding: 13
  },
  small: {
    fontSize: "0.8em",
    verticalPadding: 2,
    horizontalPadding: 7,
    svgHeight: 15
  },
  loading: {
    svgAnimation: `${spinAnimation} 1s linear infinite`
  }
};

const themeFrom = props => (
  Object.keys(themes).reduce((currentTheme, themeName) => (
    props[themeName] ? { ...currentTheme, ...themes[themeName] } : currentTheme
  ), defaultTheme)
);

const Container = styled.button`
  background-color: ${props => props.theme.backgroundColor};
  border: ${colors.primaryGreen} solid 1px;
  border-radius: 5px;
  color: ${props => props.theme.color};
  cursor: pointer;
  display: inline-block;
  font-size: ${props => props.theme.fontSize};
  font-weight: 400;
  outline: 0;
  padding: ${props => props.theme.verticalPadding}px ${props => props.theme.horizontalPadding}px;

  svg {
    height: ${props => props.theme.svgHeight}px;
    margin: 0 0 -3px -3px;
    animation: ${props => props.theme.svgAnimation};
  }

  path {
    fill: ${props => props.theme.color};
  }

  &:focus {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    text-decoration: none;
  }

  &:hover {
    background-color: ${props => props.theme.hoverBackgroundColor};
    border: ${colors.lightenedGreen} solid 2px;
    color: ${props => props.theme.hoverColor};
    padding: ${props => props.theme.verticalPadding - 1}px ${props => props.theme.horizontalPadding - 1}px;
    text-decoration: none;

    path {
      fill: ${props => props.theme.hoverColor}
    }
  }

  &:active {
    background-color: ${props => props.theme.activeBackgroundColor};
    border: ${colors.darkenedGreen} solid 2px;
    color: ${props => props.theme.activeColor};
    padding: ${props => props.theme.verticalPadding - 1}px ${props => props.theme.horizontalPadding - 1}px;

    path {
      fill: ${props => props.theme.activeColor}
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: .6;
  }
`;

const Button = ({ icon, children, ...props }) => (
  <Container theme={themeFrom(props)} {...props}>
    {props.loading ?
      <Fragment><Icon icon="load-c" />{" "}</Fragment> :
      icon && <Fragment><Icon icon={icon} />{" "}</Fragment>
    }
    {children}
  </Container>
);

export default Button;
