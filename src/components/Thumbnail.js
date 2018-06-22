import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: url(${props => props.image}) no-repeat center;
  background-size: cover;
  border-radius: ${props => props.size}px;
  display: inline-block;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
`;

const Thumbnail = ({ size = 25, ...props }) => (
  <Container size={size} {...props} />
);

export default Thumbnail;
