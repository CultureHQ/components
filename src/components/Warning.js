import React from "react";
import styled from "styled-components";

import { colors } from "../common.json";

const Container = styled.div`
  background-color: ${colors.warning.background};
  color: ${colors.warning.font};
  border: 1px solid ${colors.warning.border};
  margin-bottom: 20px;
  padding: 15px;
`;

const Text = styled.p`
  margin: 0;
`;

const Warning = ({ children, ...props }) => (
  <Container {...props}>
    <Text>{children}</Text>
  </Container>
);

export default Warning;
