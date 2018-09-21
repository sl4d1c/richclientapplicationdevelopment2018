const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/test');
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes')(app);

/*
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});
*/

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
