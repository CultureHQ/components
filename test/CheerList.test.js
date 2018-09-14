import React, { Component } from "react";
import { mount } from "enzyme";

import { Cheer, CheerList } from "../src";

class Container extends Component {
  state = { cheered: false };

  handleCheerToggle = cheered => {
    this.setState({ cheered });
    return Promise.resolve();
  };

  render() {
    const { cheered } = this.state;

    return (
      <CheerList
        cheered={cheered}
        onCheerToggle={this.handleCheerToggle}
        {...this.props}
      />
    );
  }
}

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
