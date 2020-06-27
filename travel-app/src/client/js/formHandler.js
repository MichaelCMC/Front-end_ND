import { getGeoNames } from "./getGeoNames"
import { getWeatherBit } from "./getWeatherBit"
import { getPixabay } from "./getPixabay"
import { updateUI } from "./updateUI"
import { removeUI } from "./removeUI"
import { saveToServer } from "./saveToServer"

// set up form handling function
const formHandler = () => {
    // get the current date
    const dateToday = new Date();
    // get the buttons and the date input form
    const saveButton = document.getElementById("save");
    const dateForm = document.getElementById("date");
    const removeButton = document.getElementById("remove");
    // set up an object for our api data
    const apiData = { weather: [], pictureURL: "", daysToTrip: 0, placeName: "" };

    // disable the remove button since the UI hasn't been updated
    removeButton.disable = true;

    // check if the remove button has been pressed, if so call removeUI function
    removeButton.addEventListener("click", () => {
        removeUI();
    })


    // set up an event listener for the save trip button
    saveButton.addEventListener("click", () => {
        // get the user input place name
        const placeName = document.getElementById("destination").value;
        // if any of the inputs are empty, alert the user
        if (dateForm.value === "" || placeName === "") {
            alert("Please fill out the form prior to saving the trip!!!");
        } else {
            // get a date object form the user input date
            const dateDeparting = new Date(dateForm.value);
            // calcuate the amount of days until departing date
            const daysToTrip = Math.ceil((dateDeparting - dateToday) / (1000 * 60 * 60 * 24));
            // save days until departing date place into the object
            apiData.daysToTrip = daysToTrip;
            apiData.placeName = placeName;
            // check if user input day has already occured
            if (daysToTrip >= 0) {
                // call the function to get lat and lon data from geoNames API
                getGeoNames(placeName).then(geoData => {
                    // if the API actually returned data, store in object 
                    if (geoData.postalCodes.length) {
                        const { lat, lng } = geoData.postalCodes[0];
                        // call the function to get weather data from weatherBit API
                        return getWeatherBit(lat, lng, daysToTrip)
                    } else {
                        // if no geo data is returned, throw an error
                        throw new Error("Invalid Destination: Cannot find the destination!!!");
                    }
                }).then(weatherData => {
                    // if the departing date isn't today
                    if (daysToTrip > 0) {
                        // if the departing date is more than 15 days away, set it to 15 days
                        if (daysToTrip > 15) {
                            daysToTrip = 15;
                        }
                        // set the expect high and low temp and weather description into arrays and store into object
                        apiData.weather = ["Expected weather for then is:", `High - ${weatherData.data[daysToTrip].high_temp} &#8451, Low - ${weatherData.data[daysToTrip].low_temp} &#8451`, `Expect ${weatherData.data[daysToTrip].weather.description.toLowerCase()}`];
                    } else {
                        // set the current temp and current weather description into arrays and store into object
                        apiData.weather = ["Current weather is:", `${weatherData.data[0].temp} &#8451`, `With ${weatherData.data[0].weather.description.toLowerCase()}`];
                    }
                    // after getting the weather data, call the function to get a url of an image of the travel location
                    return getPixabay(placeName);
                }).then(pixabayData => {
                    // if there is an image for the travel location
                    if (pixabayData.hits.length) {
                        // get the image url and set it into the object
                        apiData.pictureURL = pixabayData.hits[0].largeImageURL;
                    } else {
                        // throw an error if no image can be found
                        throw new Error("Can't Find The Image: Make sure the place is typed correctly!!!")
                    }
                    // send the api data object to the next then
                    return apiData;
                }).then(apiData => {
                    // save data to local server
                    saveToServer(apiData);
                    // with the apiData, update the UI dynamically
                    updateUI(apiData);
                }).catch(error => {
                    // alert user that there was an error
                    alert(error.message);
                })
            } else {
                // alert user that deparing date has already past
                alert("Invalid Departing Date: Departing date has already occured!!!");
            }
        }
    })
}
export {
    formHandler
}