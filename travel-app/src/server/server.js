var path = require("path");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// set up env file
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

// set up object to store client data
let clientData = {};

console.log(__dirname);

// sending the dist index file when accessing local server
app.get('/', (req, res) => {
    res.sendFile('dis/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html'));
});

// local server port
app.listen(8000, () => {
    console.log('Local server listening to port 8000');
})

// get geoNames user name from the env file
app.get('/geoNamesUserName', (req, res) => {
    console.log("Getting geoNames username");
    res.send(`${process.env.geoNames_username}`);
})

// get weatherbit API key from env file
app.get('/weatherBitAPIKey', (req, res) => {
    console.log("Getting weatherBit API Key");
    res.send(`${process.env.weatherBit_APIKey}`);
})

// get pixabay API key from env file
app.get('/pixabayAPIKey', (req, res) => {
    console.log("Getting pixabay API Key");
    res.send(`${process.env.pixabay_APIKey}`);
})

// post client data to local server
app.post('/saveData', (req, res) => {
    console.log("Saving client data");
    clientData = {...(req.body)};
    console.log(`From client: ${JSON.stringify(clientData)}`);
})

module.exports = app;