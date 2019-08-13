import React from "react";
import { render } from "@testing-library/react";

import Loader from "../Loader";
import Spinner from "../Spinner";

const Loaded = () => <p>Loaded</p>;

test("has no violations", () => (
  expect(<Loader loading />).toHaveNoViolations()
));

test("passes on className", () => {
  const { container } = render(
    <Loader loading className="loader">
      <Loaded />
    </Loader>
  );

  expect(container.firstChild.classList).toContain("loader");
});

test("renders a placeholder if loading and not yet spinning", () => {
  const { container, queryByText } = render(
    <Loader loading>
      <Loaded />
    </Loader>
  );

  expect(queryByText("Loaded")).toBeFalsy();
  expect(container.querySelector("[aria-hidden='true']")).toBeTruthy();
});

test("automatically renders content if loading is false", () => {
  const { queryByText } = render(
    <Loader>
      <Loaded />
    </Loader>
  );

  expect(queryByText("Loaded")).toBeTruthy();
});

test("does not render a spinner if the loading is completed", done => {
  const { queryByText, rerender } = render(
    <Loader loading>
      <Loaded />
    </Loader>
  );

  setTimeout(() => {
    expect(queryByText("Loaded")).toBeTruthy();
    done();
  }, 250);

  rerender(
    <Loader>
      <Loaded />
    </Loader>
  );
});

test("renders a spinner if loading takes too long", done => {
  const { container } = render(
    <Loader loading>
      <Loaded />
    </Loader>
  );

  setTimeout(() => {
    expect(container.querySelector("[aria-hidden='false']")).toBeTruthy();
    done();
  }, 250);
});

test("renders the content once it has loaded", () => {
  const { queryByText, rerender } = render(
    <Loader loading>
      <Loaded />
    </Loader>
  );

  rerender(
    <Loader>
      <Loaded />
    </Loader>
  );

  expect(queryByText("Loaded")).toBeTruthy();
});

test("clears the timeout if it exists when the component unmounts", done => {
  const { unmount } = render(
    <Loader loading>
      <Loaded />
    </Loader>
  );

  unmount();
  setTimeout(done, 250);
});
