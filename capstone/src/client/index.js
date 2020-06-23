import {getGeoName} from "./js/formHandler"

const button = document.getElementById("save");
button.addEventListener("click", () => {getGeoName()})

export { getGeoName}