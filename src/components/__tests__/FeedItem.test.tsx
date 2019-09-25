import React from "react";
import { render } from "@testing-library/react";

import FeedItem from "../FeedItem";

test("has no violations", () => {
  const component = (
    <FeedItem>
      <FeedItem.Body>This is a feed item body.</FeedItem.Body>
      <FeedItem.Footer>This is a feed item footer.</FeedItem.Footer>
    </FeedItem>
  );

  return expect(component).toHaveNoViolations();
});

test("renders without crashing", () => {
  const bodyMessage = "This is a feed item body.";
  const footerMessage = "This is a feed item footer.";

  const { queryByText } = render(
    <FeedItem>
      <FeedItem.Body>{bodyMessage}</FeedItem.Body>
      <FeedItem.Footer>{footerMessage}</FeedItem.Footer>
    </FeedItem>
  );

  expect(queryByText(bodyMessage)).toBeTruthy();
  expect(queryByText(footerMessage)).toBeTruthy();
});

test("passes on className", () => {
  const { container } = render(<FeedItem className="feed-item" />);

  expect(container.querySelector(".feed-item")).toBeTruthy();
});
