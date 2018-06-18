import React from "react";
import styled from "styled-components";

import { colors, fontSizes } from "../common.json";

const colorFrom = color => {
  switch (color) {
    case "blue":
      return colors.linkBlue;
    case "gray":
      return colors.secondaryFont;
    case "red":
      return colors.primaryRed;
  }
};

const Container = styled.div`
  background-color: ${props => colorFrom(props.color)};
  color: white;
  display: inline-block;
  font-size: ${fontSizes.small};
  margin-left: 5px;
  padding: 0px 6px;
`;

const Tag = ({ children, color = "blue" }) => (
  <Container color={color}>{children}</Container>
);

export default Tag;
