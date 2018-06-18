import React from "react";
import styled from "styled-components";

import { colors, fontSizes } from "../common.json";

const colorAliases = {
  blue: colors.linkBlue,
  gray: colors.secondaryFont,
  red: colors.primaryRed
};

const Container = styled.div`
  background-color: ${props => colorAliases[props.color]};
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
