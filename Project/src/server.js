const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes')(app);

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
