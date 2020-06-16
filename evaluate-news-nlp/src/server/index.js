var path = require('path');
const express = require('express');
const cors = require('cors');
var aylien = require('aylien_textapi');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

// set up aylien api call
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


// recieve post request and process properly based on if its a tweet or article
app.post('/ayilen', (req, res) => {
    console.log(`ayilen POST request recieved with ${req.body.mode} mode`);
    textapi.sentiment({
        'url': req.body.url,
        'mode': req.body.mode
    }, function (error, response) {
        if (error === null) {
            res.send(response);
        }
    });
});
