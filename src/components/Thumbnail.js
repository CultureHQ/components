import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: url(${props => props.image}) no-repeat center;
  background-size: cover;
  border-radius: ${props => props.square ? 0 : `${props.imageSize}px`};
  display: inline-block;
  height: ${props => props.imageSize}px;
  width: ${props => props.imageSize}px;
`;

const Thumbnail = ({ square = false, size = 25, ...props }) => (
  <Container square={square} imageSize={size} {...props} />
);

export default Thumbnail;
