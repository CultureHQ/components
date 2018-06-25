import styled from "styled-components";

import { colors } from "../common.json";

const FeedItem = styled.div`
  background-color: white;
  border-radius: 3px;
  box-shadow: .5px .5px 3px rgba(0, 0, 0, .2);
  margin-bottom: 15px;
  min-height: 100px;
`;

FeedItem.Body = styled.div`
  padding: 15px;
`;

FeedItem.Footer = styled.div`
  border-top: 1px solid ${colors.border};
  padding: 15px;
`;

export default FeedItem;
