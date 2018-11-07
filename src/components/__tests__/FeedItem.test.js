import React from "react";
import { shallow } from "enzyme";

import FeedItem from "../FeedItem";

test("has no violations", async () => {
  const component = (
    <FeedItem>
      <FeedItem.Body>This is a feed item body.</FeedItem.Body>
      <FeedItem.Footer>This is a feed item footer.</FeedItem.Footer>
    </FeedItem>
  );

  await expect(component).toHaveNoViolations();
});

test("renders without crashing", () => {
  const bodyMessage = "This is a feed item body.";
  const footerMessage = "This is a feed item footer.";

  const component = shallow((
    <FeedItem>
      <FeedItem.Body>{bodyMessage}</FeedItem.Body>
      <FeedItem.Footer>{footerMessage}</FeedItem.Footer>
    </FeedItem>
  ));

  expect(component.html()).toContain(bodyMessage);
  expect(component.html()).toContain(footerMessage);
});

test("passes on className", () => {
  const component = shallow(<FeedItem className="feed-item" />);

  expect(component.hasClass("feed-item")).toBe(true);
});
