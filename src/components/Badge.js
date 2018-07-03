import React from "react";
import styled from "styled-components";

import { colors } from "../common.json";

const Badge = styled.button`
  background: none;
  border: 1px solid ${props => props.primary ? colors.primaryBlue : colors.border};
  border-radius: 17px;
  color: ${props => props.primary ? colors.primaryBlue : colors.primaryFont};
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  padding: 5px 12px;
  text-decoration: none;
`;

export default Badge;
