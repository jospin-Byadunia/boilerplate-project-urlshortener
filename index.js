require('dotenv').config;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


// Basic Configuration
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

module.exports = app;

