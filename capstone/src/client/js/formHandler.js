import { getGeoNames } from "./getGeoNames"
import { getWeatherBit } from "./getWeatherBit"
import { getPixabay } from "./getPixabay"

const formHandler = () => {
    const dateToday = new Date();
    const button = document.getElementById("save");
    const dateForm = document.getElementById("date")


    button.addEventListener("click", () => {
        const placeName = document.getElementById("destination").value;
        const dateDeparting = new Date(dateForm.value);
        const daysToTrip = Math.ceil((dateDeparting - dateToday) / (1000 * 60 * 60 * 24));
        if (daysToTrip >= 0) {
            getGeoNames(placeName).then(geoData => {
                if (geoData.postalCodes.length) {
                    const { lat, lng } = geoData.postalCodes[0];
                    return getWeatherBit(lat, lng, daysToTrip)
                } else {
                    throw new Error("Invalid Destination: Cannot find the destination!!!");
                }
            }).then(weatherData => {
                // do stuff with weather data
                return getPixabay(placeName);
            }).then(pixabayData => {
                if (pixabayData.hits.length) {
                    console.log(pixabayData.hits[0].pageURL);
                } else {
                    throw new Error("Can't Find Image: Make sure the place is typed correctly!!!")
                }
            }).catch()
        } else {
            alert("Invalid Departing Date: Departing date has already occured!!!");
        }
    })
}
export { formHandler }