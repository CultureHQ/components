import React, { useState } from "react";
import { mount } from "enzyme";

import Cheer from "../Cheer";
import CheerList from "../CheerList";

const Container = props => {
  const [cheered, setCheered] = useState(false);

  const onCheerToggle = nextCheered => {
    setCheered(nextCheered);
    return Promise.resolve();
  };

  return <CheerList cheered={cheered} onCheerToggle={onCheerToggle} {...props} />;
};

test("has no violations", async () => {
  await expect(<div><CheerList cheers={[]} /></div>).toHaveNoViolations();
});

test("renders the number of cheers provided", () => {
  const cheers = [
    { name: "Hermione" },
    { name: "Ron" },
    { name: "Luna" },
    { name: "Neville" }
  ];

  const component = mount(<Container name="Harry" cheers={cheers} />);
  expect(component.find(Cheer)).toHaveLength(5);

  component.find("button").simulate("click");
  component.update();

  expect(component.find("Cheer")).toHaveLength(6);
});
