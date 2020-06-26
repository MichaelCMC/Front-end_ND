const getGeoNames = async (placeName) => {

    // base url for geoName API
    const geoNameBaseURL = "http://api.geonames.org/postalCodeSearchJSON?placename="
    // geoName username for API access
    let geoNameUserName = "";

    // fetch from local server geoName username
    const getUserName = await fetch("http://localhost:8000/geoNamesUserName");
    try {
        // set the geoName username
        geoNameUserName = await getUserName.text();
    } catch(error) {
        console.log('error', error);
    }
    
    // create the geoName API request URL
    const url = `${geoNameBaseURL}${placeName}&username=${geoNameUserName}`;

    // fetch from geoName API
    const result = await fetch(url);
    try {
        // return the result from API fetch
        const geoData = await result.json();
        return geoData;
    } catch (error) {
        console.log('error', error);
    }

}

export {
    getGeoNames
}