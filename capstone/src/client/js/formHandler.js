import { getGeoNames } from "./getGeoNames"
import { getWeatherBit } from "./getWeatherBit"

const formHandler = () => {
    const dateToday = new Date();
    const button = document.getElementById("save");
    const dateForm = document.getElementById("date")
    button.addEventListener("click", () => {
        const dateDeparting = new Date(dateForm.value);
        const daysToTrip = Math.ceil((dateDeparting - dateToday) / (1000 * 60 * 60 * 24));
        if (daysToTrip >= 0) {
            getGeoNames().then(geoData => {
                if (geoData.postalCodes.length) {
                    const {lat, lng} = geoData.postalCodes[0];
                    return getWeatherBit(lat, lng, daysToTrip)
                } else {
                    throw new Error("Invalid Destination: Cannot find the destination!!!");
                }
            }).then(weatherData => {
                console.log(weatherData);
            })
        } else {
            alert("Invalid Departing Date: Departing date has already occured!!!");
        }
    })
}
export { formHandler }