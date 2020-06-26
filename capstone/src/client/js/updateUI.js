const updateUI = (apiData) => {
    const { weather, pictureURL, daysToTrip, placeName} = apiData;
    let daysToTripHTML = document.getElementById("daysToTrip");
    let weatherTextHTML = document.getElementById("weatherText");
    let weatherTempHTML = document.getElementById("weatherTemp");
    let weatherDesHTML = document.getElementById("weatherDes");
    let imgHTML = document.getElementById("travelImg");

    let daysDes = "days";
    if (daysToTrip === 1) {
        daysDes = "day";
    }

    daysToTripHTML.innerText = `${placeName} is ${daysToTrip} ${daysDes} away!!!`;
    weatherTextHTML.innerText = `${weather[0]}`;
    weatherTempHTML.innerHTML = `${weather[1]}`;
    weatherDesHTML.innerHTML = `${weather[2]}`;
    imgHTML.src = pictureURL;
    imgHTML.alt = `Image of ${placeName}`;

    document.getElementById("remove").disable = false;
}

export {
    updateUI
}