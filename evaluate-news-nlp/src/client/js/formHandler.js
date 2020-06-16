import {
    checkURL
} from './checkURL.js'

// function is run when the submit button is pressed
function handleSubmit(event) {
    // delay default behavior
    event.preventDefault();

    // print feedback
    console.log('::: URL Submitted :::');

    // get the url from the user input and the type of link
    const url = document.getElementById('name').value;
    const radioBtns = document.getElementsByName('type');
    let btnValue = "";
    for (let btn of radioBtns) {
        if (btn.checked) {
            btnValue = btn.value;
        }
    }


    // check to see if the url is valid
    const validity = checkURL(url, btnValue);

    // calls the ayilen API from the local server
    const ayilenFetch = async (url) => {
        const response = await fetch('http://localhost:8081/ayilen', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'url': url,
                'mode': btnValue
            })
        });

        try {
            // return the jsonified response
            const newData = await response.json();
            return newData;
        } catch (error) {
            console.log("error", error);
        }
    };

    // updates the UI to show the sentiment analysis result
    const updateUI = (data) => {
        // get the result section
        const resultSection = document.getElementById('results');

        // create elements based on the sentiment analysis result
        const type = document.createElement('p');
        type.innerHTML = `<span>Link Type:</span> ${btnValue === 'tweet' ? 'tweet' : 'article'}`;
        const polarity = document.createElement('p');
        polarity.innerHTML = `<span>Polarity:</span> ${data.polarity} <span>Confidence:</span> ${(data.polarity_confidence * 100).toFixed(2)}%`;
        const subjectivity = document.createElement('p');
        subjectivity.innerHTML = `<span>Subjectivity:</span> ${data.subjectivity} <span>Confidence:</span> ${(data.subjectivity_confidence * 100).toFixed(2)}%`;
        const text = document.createElement('p');
        text.innerHTML = `<span>Text:</span> ${data.text}`;

        // clear the result section
        resultSection.innerHTML = '';

        // add the created elements to the result section 
        for (const child of [type, polarity, subjectivity, text]) {
            resultSection.appendChild(child);
        }

        // get the span tags
        const spans = document.getElementsByTagName('span');
        // update the span color based on the polarity of the article/tweet
        for (const span of spans) {
            span.classList.toggle(`${data.polarity}`);
        }

        // get the main tag
        const main = document.getElementsByTagName('main')[0];

        // clear the classes in main and update color based on polarity
        main.className = '';
        main.classList.toggle(`${data.polarity}`);

    };

    // check if the article link or tweet link is valid
    if (validity === 'valid') {
        // print valid feedback
        console.log('::: Valid URL :::');
        // call ayilen apy then update the UI dynamically
        ayilenFetch(url).then((data) => {
            // print the api response
            console.log(data);
            updateUI(data);
        });
    // give alert if there is an issue
    // if it's not a twitter link
    } else if (validity === 'invalid_twitter') {
        console.log('::: Not A Twitter Link :::');
        alert('Not A Twitter Link');
    // if it's an invalid tweet
    } else if (validity === 'invalid_tweet') {
        console.log('::: Not A Tweet ::::');
        alert('Make sure it is an actual Tweet');
    // if it's a twitter link and sent as an article
    } else if (validity === 'twitter') {
        console.log('::: It\'s Twitter Link :::');
        alert('Seems Like it\'s twitter link, make sure you chose the right type of website')
    // if all fails, inavlid URL
    } else {
        console.log('::: Invalid URL :::');
        alert('Invalid URL')
    }
}

export {
    handleSubmit
}