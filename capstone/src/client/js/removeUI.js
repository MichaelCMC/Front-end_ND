const removeUI = () => {
    // select the HTML elements of interest
    let daysToTripHTML = document.getElementById("daysToTrip");
    let weatherTextHTML = document.getElementById("weatherText");
    let weatherTempHTML = document.getElementById("weatherTemp");
    let weatherDesHTML = document.getElementById("weatherDes");
    let imgHTML = document.getElementById("travelImg");

    // reset the HTML elements to default
    daysToTripHTML.innerText = "Days until ---";
    weatherTextHTML.innerText = "Current Weather: --";
    weatherTempHTML.innerText = "Current Temperature --";
    weatherDesHTML.innerText = "Current Weather Description --";
    imgHTML.src = "https://newsroom.aaa.com/wp-content/uploads/2019/09/best-time-book-travel-holidays.jpg";
    imgHTML.alt = "Plane Flying";

    // reset the user input
    document.getElementById("destination").value = "";
    document.getElementById("date").value = "";

    // disable the remove button since the trip was just removed
    document.getElementById("remove").disable = true;


}

export { removeUI }