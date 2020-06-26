const getPixabay = async (placeName) => {

    // base URL for pixabay API
    const pixabayBaseURL = "https://pixabay.com/api/?"
    // pixabay API Key
    let pixabayAPIKey = "";

    // fetch from local server pixabay API Key
    const getAPIKey = await fetch("http://localhost:8000/pixabayAPIKey");
    try {
        // set the pixabay API Key
        pixabayAPIKey = await getAPIKey.text();
    } catch(error) {
        console.log('error', error);
    }
    
    // create the pixabay API request URL
    const url = `${pixabayBaseURL}q=${placeName}&image_type=photo&category=places&orientation=horizontal&key=${pixabayAPIKey}`;

    // fetch from pixabay API
    const result = await fetch(url);
    try {
        // return the result from API fetch
        const pixabayPicture = await result.json();
        return pixabayPicture;
    } catch (error) {
        console.log('error', error);
    }

}

export {
    getPixabay
}