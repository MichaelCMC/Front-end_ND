const getWeatherBit = async (lat, lon, daysToTrip) => {

    // base url for current weather 
    const weatherBitBaseURL = "https://api.weatherbit.io/v2.0/current?";
    // base url for weather forecast
    const weatherBitForecastURL = "https://api.weatherbit.io/v2.0/forecast/daily?"

    // weather bit API Key
    let weatherBitAPIKey = "";

    // fetch from local server weather bit API Key
    const getWeatherBitAPIKey = await fetch("http://localhost:8000/weatherBitAPIKey");
    try {
        // set the weather bit API Key
        weatherBitAPIKey = await getWeatherBitAPIKey.text();
    } catch (error) {
        console.log('error', error);
    }

    // initialize weather bit API request URL
    let url = "";
    if (daysToTrip == 0) {
        // if it is the current date, construct the url using current weather url
        url = `${weatherBitBaseURL}lat=${lat}&lon=${lon}&key=${weatherBitAPIKey}`;
    } else {
        // if it is in the future, construct the url using weather forecast url
        url = `${weatherBitForecastURL}lat=${lat}&lon=${lon}&key=${weatherBitAPIKey}`;
    }
    // fetch result weather bit API
    const result = await fetch(url);
    try {
        // return the result from API fetch
        const weatherData = await result.json();
        return weatherData;
    } catch (error) {
        console.log('error', error);
    }

}

export {
    getWeatherBit
}