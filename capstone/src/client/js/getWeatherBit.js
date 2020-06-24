const getWeatherBit = async (lat, lon, daysToTrip) => {

    const weatherBitBaseURL = "https://api.weatherbit.io/v2.0/current?";
    const getWeatherBitAPIKey = await fetch("http://localhost:8000/weatherBitAPIKey");
    let weatherBitAPIKey = "";
    try {
        weatherBitAPIKey = await getWeatherBitAPIKey.text();
    } catch(error) {
        console.log('error', error);
    }

    const url = `${weatherBitBaseURL}lat=${lat}&lon=${lon}&key=${weatherBitAPIKey}`;

    const result = await fetch(url);
    try {
        const weatherData = await result.json();
        return weatherData;
    } catch(error) {
        console.log('error', error);
    }

}

export { getWeatherBit }