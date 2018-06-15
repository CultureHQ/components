import React from "react";
import styled from "styled-components";

const colors = {
  background: "#fcf8e3",
  border: "#faebcc",
  font: "#8a6d3b"
};

const Container = styled.div`
  background-color: ${colors.background};
  color: ${colors.font};
  border: 1px solid ${colors.border};
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
