import React from "react";
import styled from "styled-components";

import { success } from "../common.json";

const Container = styled.div`
  background-color: ${success.background};
  border: 1px solid ${success.border};
  color: ${success.font};
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
