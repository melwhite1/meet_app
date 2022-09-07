import React, { Component } from "react";
export class Event extends Component {
  toggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };
  state = { show: false };
  render() {
    const { event } = this.props;
    return (
      <>

        <div className="event">
          <h1 className="event-summary-title">{event.summary}</h1>
          <p className="event-info">
            {event.start.dateTime} {event.start.timeZone} {event.location}
          </p>
          {this.state.show && (
            <>
              <h2 className="event-about-title">About event:</h2>
              <p className="event-description">{event.description}</p>
              <a
                href={event.htmlLink}
                target="_blank"
                rel="noreferrer"
                className="event-htmlLink"
              >
                See details on Google Calendar
              </a>
            </>
          )}
          {!this.state.show ? (
            <button
              className="event-showDetails-btn"
              onClick={this.toggleEventDetails}
            >
              Show Details
            </button>
          ) : (
            <button
              className="event-hideDetails-btn"
              onClick={this.toggleEventDetails}
            >
              Hide Details
            </button>
          )}
        </div>
      </>
    );
  }
}
export default Event;
