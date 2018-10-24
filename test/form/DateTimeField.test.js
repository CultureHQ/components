import React, { Component } from "react";
import { mount } from "enzyme";

import { DateTimeField } from "../../src";

class DateTimeFieldContainer extends Component {
  state = { value: new Date(2018, 0, 1, 0, 0, 0) };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return <DateTimeField value={value} onChange={this.handleChange} />;
  }
}

test("functions as expected", () => {
  const component = mount(<DateTimeFieldContainer />);

  component.find("button.chq-ffd--dt").simulate("click");
  component.find("button.chq-cal--day").at(15).simulate("click");
  component.find("button.chq-tsl--op").at(52).simulate("click");

  expect(component.state().value).toEqual("2018-01-15T13:00:00.000Z");
});
