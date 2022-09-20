import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        infoText: '',
    };

    handleInputChanged = (event) => {
      let inputValue = event.target.value;
      if (inputValue >= 33 || inputValue <= 0) {
        this.setState({
          numberOfEvents: inputValue,
          infoText: 'Please enter a number between 1 - 32.',
        });
      } else {
        this.setState({
          numberOfEvents: event.target.value,
          infoText: ' ',
        });
      }

      this.props.updateEvents(undefined, inputValue);
    };

    render() {
        return (
            <div className="numberOfEvents">
                <label htmlFor="number-of-events">Show max: </label>
                <input
                  type="number"
                  id="events-num-input"
                  value={this.state.numberOfEvents}
                  onChange={this.handleInputChanged}
                />
                <div>
                  <ErrorAlert text={this.state.infoText} />
                </div>
              </div>
            );
          }
        }

export default NumberOfEvents;
