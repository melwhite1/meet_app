import React, { Component } from 'react';

export class NumberOfEvents extends Component {
  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ numOfEvents: value });
  };
  state = { numOfEvents: 32 };
  render() {
    return (
      <div className="numberOfEvents">
        <p>Number of Events</p>
        <input
          type="number"
          className="number-input"
          value={this.state.numOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
