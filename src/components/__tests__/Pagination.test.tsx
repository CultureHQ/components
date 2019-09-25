import React from "react";
import { fireEvent, render } from "@testing-library/react";

import Pagination from "../Pagination";

type PaginationOptions = {
  className?: string;
  onClick?: (page: number) => void;
};

const renderPagination = (
  currentPage: number,
  totalPages: number,
  { className, onClick = jest.fn() }: PaginationOptions = {}
) => (
  render(
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      className={className}
      onClick={onClick}
    />
  )
);

test("has no violations", () => (
  expect(<Pagination currentPage={1} totalPages={10} onClick={jest.fn()} />).toHaveNoViolations()
));

test("renders without crashing", () => {
  const { container } = renderPagination(1, 10);
  const navElement = container.firstChild as HTMLElement;

  expect(navElement).not.toBe(null);
  expect(navElement.nodeName).toEqual("NAV");
});

test("passes on className", () => {
  const { container } = renderPagination(1, 10, { className: "pagination" });

  expect(container.querySelector(".pagination")).toBeTruthy();
});

test("displays nothing if there are fewer than two pages", () => {
  const { container } = renderPagination(1, 1);

  expect(container.querySelector("*")).toBeFalsy();
});

test("deactivates the prev and next buttons correctly on the first page", () => {
  const { getAllByRole } = renderPagination(1, 10);
  const buttons = getAllByRole("button");

  expect(buttons[0]).toHaveProperty("disabled", true);
  expect(buttons[buttons.length - 1]).toHaveProperty("disabled", false);
});

test("deactivates the prev and next buttons correctly on the last page", () => {
  const { getAllByRole } = renderPagination(10, 10);
  const buttons = getAllByRole("button");

  expect(buttons[0]).toHaveProperty("disabled", false);
  expect(buttons[buttons.length - 1]).toHaveProperty("disabled", true);
});

test("adds the first and last pages if they're not in the inner window", () => {
  const { getAllByRole } = renderPagination(10, 20);
  const buttons = getAllByRole("button");

  expect(buttons[1].textContent).toEqual("1");
  expect(buttons[buttons.length - 2].textContent).toEqual("20");
});

test("adds the number if within 5 of the start or end", () => {
  const { getAllByRole } = renderPagination(5, 9);

  const buttons = getAllByRole("button");
  const labels = buttons.map(button => button.textContent).slice(1, buttons.length - 2);

  labels.forEach((label, index) => {
    expect(label).toEqual((index + 1).toString());
  });
});

test("adds spacers if the far enough away from the ends", () => {
  const { container } = renderPagination(10, 20);

  expect(container.querySelectorAll("[aria-hidden]")).toHaveLength(2);
});

test("calls the onClick handler with the correct page number", () => {
  const clicked: number[] = [];
  const onClick = (page: number) => clicked.push(page);

  const { getAllByRole } = renderPagination(10, 20, { onClick });
  const buttons = getAllByRole("button");

  [0, 1, 3, 4, 5, 7, 8].forEach(index => {
    fireEvent.click(buttons[index]);
  });

  expect(clicked).toEqual([9, 1, 9, 11, 20, 11]);
});
