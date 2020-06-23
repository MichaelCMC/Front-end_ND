var path = require("path");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile('dis/index.html');
    // res.sendFile(path.resolve('src/client/views/index.html'));
});

app.listen(8000, () => {
    console.log('Local server listening to port 8000');
})

app.get('/geoNamesUserName', (req, res) => {
    console.log("Getting geoNames username")
    res.send(`${process.env.geoNames_username}`);
})