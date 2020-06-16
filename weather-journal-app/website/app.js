/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "&appid=37f4f58615f01fb9641893ed8f53df47&units=imperial";
const button = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'-'+ d.getDate()+'-'+ d.getFullYear();

// get weather data from OpenWeatherMap
const getWeatherData = async () => {
    // get user zip code
    let zip = document.getElementById('zip').value;
    // create the url from base, user zipcode, and api key
    let url = `${baseURL}zip=${zip},us${apiKey}`;
    
    // fetch weather data
    const res = await fetch(url);
     try {
        const weatherData = await res.json();
        return weatherData;
     } catch(error) {
         console.log('error', error);
     }
};

// post weather data to local server
const postWeatherData = async weatherData => {
    // get user feeling from input
    let userResponse = document.getElementById('feelings').value;

    // create an object from user feeling, today's date, and temperature
    const data = {feelings: userResponse, date: newDate, temperature: weatherData.main.temp};

    // fetch a post request to local server
    const res = await fetch('http://localhost:8000/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

// get data from local server then update the UI dynamically
const updateUI = async () => {
    // get data from local server
    const res = await fetch('http://localhost:8000/get');

    try {
        const data = await res.json();

        // update the UI dynamically from the obtained data
        document.getElementById('date').innerText = `Current Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Current Temperature: ${data.temperature.toFixed(2)} &#8457`;
        document.getElementById('content').innerText = `Current Feelings: ${data.feelings}`;

    } catch(error) {
        console.log('error', error);
    }
};

// when the submit button is clicked, get weather data from OpenWeatherMap, then post to local server, then update the UI dynamically
document.getElementById('generate').addEventListener('click', () => {
    getWeatherData().then(weatherData => {
        postWeatherData(weatherData);
    }).then(() => {
        updateUI();
    });
});
