import React from "react";
import styled from "styled-components";

import { common, info } from "./common.json";

const Container = styled.div`
  background-color: ${info.background};
  color: ${common.primaryBlue};
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
