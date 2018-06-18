import React from "react";
import styled from "styled-components";

const Thumbnail = styled.div`
  background: url(${props => props.image}) no-repeat center;
  background-size: cover;
  border-radius: 20px;
  display: inline-block;
  height: 25px;
  width: 25px;
`;

export default Thumbnail;
