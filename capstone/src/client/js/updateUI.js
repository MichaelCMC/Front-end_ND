const updateUI = (apiData) => {
    // select the HTML elements of interest
    const { weather, pictureURL, daysToTrip, placeName} = apiData;
    let daysToTripHTML = document.getElementById("daysToTrip");
    let weatherTextHTML = document.getElementById("weatherText");
    let weatherTempHTML = document.getElementById("weatherTemp");
    let weatherDesHTML = document.getElementById("weatherDes");
    let imgHTML = document.getElementById("travelImg");

    // check if days should be plural or not
    let daysDes = "days";
    if (daysToTrip === 1) {
        daysDes = "day";
    }

    // update the HTML elements with information obtained from the 3 API requests
    daysToTripHTML.innerText = `${placeName} is ${daysToTrip} ${daysDes} away!!!`;
    weatherTextHTML.innerText = `${weather[0]}`;
    weatherTempHTML.innerHTML = `${weather[1]}`;
    weatherDesHTML.innerHTML = `${weather[2]}`;
    imgHTML.src = pictureURL;
    imgHTML.alt = `Image of ${placeName}`;

    // enable the remove button since the trip was saved and it is no longer the default webpage
    document.getElementById("remove").disable = false;
}

export {
    updateUI
}