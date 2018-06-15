import React from "react";
import styled from "styled-components";

import { warning } from "./common.json";

const Container = styled.div`
  background-color: ${warning.background};
  color: ${warning.font};
  border: 1px solid ${warning.border};
  margin-bottom: 20px;
  padding: 15px;
`;

const Text = styled.p`
  margin: 0;
`;

const Warning = ({ children }) => (
  <Container>
    <Text>{children}</Text>
  </Container>
);

export default Warning;
