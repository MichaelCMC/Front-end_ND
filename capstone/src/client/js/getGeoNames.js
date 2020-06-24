const getGeoNames = async () => {

    const geoNameBaseURL = "http://api.geonames.org/postalCodeSearchJSON?placename="
    const placename = document.getElementById("destination").value;
    let geoNameUserName = "";

    const getUserName = await fetch("http://localhost:8000/geoNamesUserName");
    try {
        geoNameUserName = await getUserName.text();
    } catch(error) {
        console.log('error', error);
    }
    
    const url = `${geoNameBaseURL}${placename}&username=${geoNameUserName}`;

    const result = await fetch(url);
    try {
        const geoData = await result.json();
        return geoData;
    } catch (error) {
        console.log('error', error);
    }

}

export {
    getGeoNames
}