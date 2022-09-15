# meet_app
## Dependencies
- HTML
- CSS
- JavaScript
- React API
- Google Calendar

## Feature: Show and Hide Event Details
### As a user, I would like to be able to display and collapse event details so I can see more or less information depending on my preference.
Collapsed by Default: 
- Given user is on the main page
- When nothing is selected
- Then the even details will be 'collapsed'

Expanding Details:
- Given user wants to see event details
- When the user clicks clicks on the event
- Then the details for that event will expand

Collapse Details:
- Given user has seen the details and wants to collapse
- When the user clicks outside the description
- Then the details will collapse again

## Feature: Specify number of Events
### As a user I should be able to choose the number of events I want to see
Default Number:
- Given the user searched for event results for a city
- When the user chooses no specific amount of search results
- Then the default amount of search results per city will be 32.

Changing the Number:
- Given the user opened the search results query
- When the user changes the default number
- Then the default number of results will be changed to what the users select.

## Feature: Use App Offline
### As a user I would like to be able to access events even when offline
Cached Data:
- Given the app has no internet connection
- When the data is cached T
- Then the data will be shown

Uncached Data:
- Given the app has no internet connection
- When the user navigates away from cached data
- Then an error will show

## Feature: Data Visualization
### As a user I would like to see charts with the number of upcoming events in my city
Upcoming Events:
- Given the user selected a city
- When the user clicks on the city’s upcoming events button
- Then a chart will display the upcoming events taking place in the city
