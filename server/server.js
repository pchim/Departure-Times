const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
// const api = require('./routes/api.js');
const parseLines = require('../utils/parseLineIds');
const lines = require('./responseCaches').lines;

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

// get lines function() {}or an operator id
app.get('/api/lines/:id', (req, res) => {
  console.log(lines);
  res.send(JSON.stringify(lines, null, ' '));
  // when not using cache
  // parseLines(req.params.id, data => {
  //   console.log('LINES: ' + data);
  //   res.send(data);
  // });
});

const server = app.listen(8000);
