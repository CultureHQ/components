import React from "react";
import styled from "styled-components";

import { colors } from "../common.json";

const Container = styled.div`
  background-color: ${colors.info.background};
  color: ${colors.primaryBlue};
  margin-bottom: 20px;
  padding: 15px;
`;

const Text = styled.p`
  margin: 0;
`;

const Info = ({ children }) => (
  <Container>
    <Text>{children}</Text>
  </Container>
);

export default Info;
