import {
    getGeoNames
} from "./getGeoNames"
import {
    getWeatherBit
} from "./getWeatherBit"
import {
    getPixabay
} from "./getPixabay"
import {
    updateUI
} from "./updateUI"
import {
    removeUI
} from "./removeUI"

const formHandler = () => {
    const dateToday = new Date();
    const saveButton = document.getElementById("save");
    const dateForm = document.getElementById("date");
    const removeButton = document.getElementById("remove");
    const apiData = { weather: [], pictureURL: "", daysToTrip: 0, placeName: "" };

    removeButton.disable = true;

    removeButton.addEventListener("click", () => {
        removeUI();
    })


    saveButton.addEventListener("click", () => {
        const placeName = document.getElementById("destination").value;
        if (dateForm.value === "" || placeName === "") {
            alert("Please fill out the form prior to saving the trip!!!");
        } else {
            const dateDeparting = new Date(dateForm.value);
            const daysToTrip = Math.ceil((dateDeparting - dateToday) / (1000 * 60 * 60 * 24));
            apiData.daysToTrip = daysToTrip;
            apiData.placeName = placeName;
            if (daysToTrip >= 0) {
                getGeoNames(placeName).then(geoData => {
                    if (geoData.postalCodes.length) {
                        const {
                            lat,
                            lng
                        } = geoData.postalCodes[0];
                        return getWeatherBit(lat, lng, daysToTrip)
                    } else {
                        throw new Error("Invalid Destination: Cannot find the destination!!!");
                    }
                }).then(weatherData => {
                    if (daysToTrip > 0) {
                        if (daysToTrip > 15) {
                            daysToTrip = 15;
                        }
                        apiData.weather = ["Expected weather for then is:", `High - ${weatherData.data[daysToTrip].high_temp} &#8451, Low - ${weatherData.data[daysToTrip].low_temp} &#8451`, `Expect ${weatherData.data[daysToTrip].weather.description.toLowerCase()}`];
                    } else {
                        apiData.weather = ["Current weather is:", `${weatherData.data[0].temp} &#8451`, `With ${weatherData.data[0].weather.description.toLowerCase()}`];
                    }
                    return getPixabay(placeName);
                }).then(pixabayData => {
                    if (pixabayData.hits.length) {
                        apiData.pictureURL = pixabayData.hits[0].largeImageURL;
                    } else {
                        throw new Error("Can't Find The Image: Make sure the place is typed correctly!!!")
                    }
                    return apiData;
                }).then(apiData => {
                    updateUI(apiData);
                }).catch(error => {
                    alert(error.message);
                })
            } else {
                alert("Invalid Departing Date: Departing date has already occured!!!");
            }
        }
    })
}
export {
    formHandler
}