import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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

    getData = () => {
      const {locations, events} = this.state;
      const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

    render() {
      if (this.state.showWelcomeScreen === undefined) return <div className="App" />;
      const { locations, numberOfEvents, events } = this.state;
        return (
            <div className="App">
              <h1>Meet App</h1>
              <h4>Choose your nearest city</h4>
                <OfflineAlert text={this.state.offlineText} />
                <CitySearch
                    locations={locations}
                    updateEvents={this.updateEvents} />
                <NumberOfEvents
                    numberOfEvents={numberOfEvents}
                    updateEvents={this.updateEvents}/>

                <h4>Events in each city</h4>
                <div className="data-vis-wrapper">
                  <EventGenre events={events} />
                  <ResponsiveContainer height={400} >
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid />
                      <XAxis type="category" dataKey="city" name="city" />
                      <YAxis
                        allowDecimals={false}
                        type="number"
                        dataKey="number"
                        name="number of events"
                      />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Scatter data={this.getData()} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              <EventList events={events} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} />
              <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
          </div>
        );
      }
    }

export default App;
