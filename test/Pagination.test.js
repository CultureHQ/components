import React from "react";
import { mount } from "enzyme";

import { Pagination } from "../src";

const mounted = (currentPage, totalPages, props = {}) => (
  mount((
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      {...props}
    />
  ))
);

test("has no violations", async () => {
  const component = <Pagination currentPage={1} totalPages={10} />;

  await expect(component).toHaveNoViolations();
});

test("renders without crashing", () => {
  const component = mounted(1, 10);

  expect(component.find(".chq-pag").type()).toEqual("nav");
});

test("passes on className", () => {
  const component = mounted(1, 10, { className: "pagination" });

  expect(component.find("nav").hasClass("pagination")).toBe(true);
  expect(component.find("nav").hasClass("chq-pag")).toBe(true);
});

test("displays nothing if there are fewer than two pages", () => {
  const component = mounted(1, 1);

  expect(component.html()).toBe(null);
});

test("deactivates the prev and next buttons correctly on the first page", () => {
  const component = mounted(1, 10);
  const buttons = component.find("button");

  expect(buttons.at(0).props().disabled).toBe(true);
  expect(buttons.at(buttons.length - 1).props().disabled).toBe(false);
});

test("deactivates the prev and next buttons correctly on the last page", () => {
  const component = mounted(10, 10);
  const buttons = component.find("button");

  expect(buttons.at(0).props().disabled).toBe(false);
  expect(buttons.at(buttons.length - 1).props().disabled).toBe(true);
});

test("adds the first and last pages if they're not in the inner window", () => {
  const component = mounted(10, 20);
  const buttons = component.find("button");

  expect(buttons.at(1).text()).toEqual("1");
  expect(buttons.at(buttons.length - 2).text()).toEqual("20");
});

test("adds the number if within 5 of the start or end", () => {
  const component = mounted(5, 9);
  const labels = component.find("button").slice(1, -1).map(node => node.text());

  labels.forEach((label, index) => {
    expect(label).toEqual((index + 1).toString());
  });
});

test("adds spacers if the far enough away from the ends", () => {
  const component = mounted(10, 20);

  expect(component.find(".chq-pag--sp")).toHaveLength(2);
});

test("calls the onClick handler with the correct page number", () => {
  const clicked = [];
  const onClick = page => clicked.push(page);

  const component = mounted(10, 20, { onClick });
  const buttons = component.find("button");

  [0, 1, 3, 4, 5, 7, 8].forEach(index => {
    buttons.at(index).simulate("click");
  });

  expect(clicked).toEqual([9, 1, 9, 11, 20, 11]);
});
