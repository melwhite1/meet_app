import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    eventsNumber: 32,
  };

  inputChanged = (event) => {
    //if no number is set, numberValue is set to 32 by default
    const numberValue = event.target.value;
    if (numberValue <= 0 || typeof numberValue === "number") {
      this.setState({
        errorText: "Please enter a positive number to view at least one event!",
        eventsNumber: numberValue,
        warningText: null,
      });
    } else if (numberValue > this.props.totalResNumber) {
      return this.setState({
        eventsNumber: this.props.events.length,
        errorText: null,
        warningText: `Oh no! There's only ${this.props.totalResNumber} events in this category!`,
      });
    } else if (numberValue > 0) {
      this.setState({
        eventsNumber: numberValue,
        warningText: null,
        errorText: null,
      });
    }
    this.props.updateEvents(undefined, numberValue);
  };

  render() {
    const { events, updateEvents, totalResNumber } = this.props;
    return (
      <div className="eventsNumber">
        <label>Show</label>
        <input
          type="number"
          className="edit-number"
          placeholder={this.state.eventsNumber}
          onChange={this.inputChanged}
        ></input>
        <label>Events</label>
      </div>
    );
  }
}
export default NumberOfEvents;
