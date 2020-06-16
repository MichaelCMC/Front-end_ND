// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`server running on localhost: ${port}`);
});

// Server-side GET route
app.get('/get', (req, res) => {
    console.log('processing GET request');
    res.send(projectData);
});

// Server-side POST route
app.post('/add', (req, res) => {
    console.log('processing POST request');
    let data = req.body;
    for (key in data) {
        projectData[key] = data[key];
    }
    console.log(`Updating Data With: ${JSON.stringify(projectData)}`);
});