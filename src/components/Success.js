import React from "react";
import styled from "styled-components";

import { colors } from "../common.json";

const Container = styled.div`
  background-color: ${colors.success.background};
  border: 1px solid ${colors.success.border};
  color: ${colors.success.font};
  margin-bottom: 20px;
  padding: 15px;
`;

const Text = styled.p`
  margin: 0;
`;

const Success = ({ children }) => (
  <Container>
    <Text>{children}</Text>
  </Container>
);

export default Success;
