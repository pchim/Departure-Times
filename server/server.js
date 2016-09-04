const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
// const api = require('./routes/api.js');
const parseLines = require('../utils/parseLines');
const parseStops = require('../utils/parseStops');
const parsePatterns = require('../utils/parsePatterns');
const parsePredictions = require('../utils/parsePredictions');
const caches = require('./responseCaches');
const lines = caches.lines;
const stops = caches.stops;

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
app.get('/api/lines/:op_id', (req, res) => {
  res.send(JSON.stringify(lines, null, ' '));
  // when not using cache
  // parseLines(req.params.op_id, data => {
  //   console.log('LINES: ' + data);
  //   res.send(data);
  // });
});

// get lines function() {}or an operator id
app.get('/api/stops/:op_id/:line_id', (req, res) => {
  console.log('Getting Stops');
  // res.send(JSON.stringify(lines, null, ' '));
  // when not using cache
  console.log('Operators:           ', req.params.op_id, req.params.line_id);
  parsePatterns(req.params.op_id, req.params.line_id, data => {
    res.status(200)
       .type('json')
       .send(data);
  });
});

// get predictions for an operator id and a stop
app.get('/api/predictions/:op_id/:stop_id', (req, res) => {
  parsePredictions(req.params.op_id, req.params.stop_id, data => {
    console.log('stop data--', data);
    res.status(200)
       .type('json')
       .send(data);
  });
});

const server = app.listen(8000);
