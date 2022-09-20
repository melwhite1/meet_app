import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';


class App extends Component {

    state = {
        events: [],
        locations: [],
        locationSelected: 'all',
        numberOfEvents: 32,
        showWelcomeScreen: undefined,
    }

    async componentDidMount() {
      this.mounted = true;
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({ events, locations: extractLocations(events) });
          }
        });
      }

    if (!navigator.onLine) {
      this.setState({
        warningText:
          "It seems that you're not connected to the internet, your data was loaded from the cache.",
        });
      } else {
        this.setState({
          warningText: '',
        });
      }
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    updateEvents = (location, maxNumEvents) => {
        if (maxNumEvents === undefined) {
            maxNumEvents = this.state.numberOfEvents;
        } else(
            this.setState({ numberOfEvents: maxNumEvents })
        )
        if (location === undefined) {
            location = this.state.locationSelected;
        }
        getEvents().then((events) => {
            let locationEvents = (location === 'all')
                ? events
                : events.filter((event) => event.location === location);
            this.setState({
                events: locationEvents.slice(0, maxNumEvents),
                numberOfEvents: maxNumEvents,
                locationSelected: location
            });
        });
    }

    render() {
      if (this.state.showWelcomeScreen === undefined) return <div className="App" />
        return (
            <div className="App">
                <OfflineAlert text={this.state.warningText} />
                <CitySearch
                    locations={this.state.locations}
                    updateEvents={this.updateEvents} />
                <NumberOfEvents
                    events={this.state.events}
                    updateEvents={this.updateEvents}/>
                <EventList
                    events={this.state.events}/>
                <WelcomeScreen
                    showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => { getAccessToken() }} />
            </div>
        );
    }
}

export default App;
