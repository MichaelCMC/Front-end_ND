const getPixabay = async (placeName) => {

    const pixabayBaseURL = "https://pixabay.com/api/?"
    let pixabayAPIKey = "";

    const getAPIKey = await fetch("http://localhost:8000/pixabayAPIKey");
    try {
        pixabayAPIKey = await getAPIKey.text();
    } catch(error) {
        console.log('error', error);
    }
    
    const url = `${pixabayBaseURL}q=${placeName}&image_type=photo&category=places&orientation=horizontal&key=${pixabayAPIKey}`;

    const result = await fetch(url);
    try {
        const pixabayPicture = await result.json();
        return pixabayPicture;
    } catch (error) {
        console.log('error', error);
    }

}

export {
    getPixabay
}