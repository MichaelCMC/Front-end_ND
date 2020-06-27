# Travel App Project

## Starter Code
For this project, there are no starter code. Everything was implemented from scratch.

## Project Requirement
Main project requirements are:
1. Set up forms to take user input (destination and departing date)
2. Set up GeoNames API configuration to obtain the lat and lon of the user input destination
3. Set up Weatherbit API configuration to obtain current weather or weather forecast for the destination (lat, lon)
4. Set up Pixabay API configuration to obtain an image of the destination 
5. Allow user to save the trip (update UI dynamically to see information obtained from API)
6. Allow user to remove the trip (revert the website back to original state)

The full project rubric can be found in the Requirement PDF.

## External API dependencies
1. [GeoNames](http://www.geonames.org/export/web-services.html): Used to get the lat and lon of user input destination
2. [Weatherbit](https://www.weatherbit.io/api): Used to get the current weather data or weather forecast data for the destination
3. [Pixabay](https://pixabay.com/api/docs/): Used to get an image of the destination

## Running the Project
1. Clone the repository
2. `npm install`

For production code:
1. `npm run build`
2. `npm run start`
3. Go to `localhost://8000`

For development code:
1. `npm run start`
2. `npm run dev`
3. Go to `localhost://8080` if it hasn't taken you there already

For testing code:
1. `npm run build`
2. `npm rum test`