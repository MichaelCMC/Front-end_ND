function checkURL(url, btnType) {
    // regex to check that it has twitter.com 
    const regex_twitter = /(?:www\.)?twitter\.com/;
    // regex to check that is has status
    const regex_status = /\/status\//;

    // if user input a link to an article
    if (btnType === 'document') {
        // regex to check that it is a proper url
        const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        // if it shows twitter feed
        if (regex_twitter.test(url) && regex_status.test(url)) {
            return 'twitter';
        // if it is a valid url
        } else if (regex.test(url)) {
            return 'valid';
        } else {
            return 'invalid';
        }
    } else {
        // regex to check that it is a proper tweet
        const regex = /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/;

        // if it shows proper tweet
        if (regex.test(url)) {
            return 'valid';
        // if it doesn't show twitter.com
        } else if (!regex_twitter.test(url)) {
            return 'invalid_twitter';
        // if it doesn't show that it is a twitter feed
        } else if (!regex_status.test(url)) {
            return 'invalid_tweet';
        } else {
            return 'invalid';
        }
    }
}


export {
    checkURL
}