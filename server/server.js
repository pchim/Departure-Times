const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const useApi = require('./routes/api.js');
require('dotenv').config();
// const api = require('./routes/api.js');


// parses sent data into response body
app.use(bodyParser.urlencoded({ extended: true }));
app.use( (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
app.use(express.static(path.resolve(__dirname, '../')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../index.html'));
});
useApi(app);

const server = app.listen(8000);
