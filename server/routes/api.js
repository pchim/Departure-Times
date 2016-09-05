const parseLines = require('../../utils/parseLines');
const parseStops = require('../../utils/parseStops');
const parsePatterns = require('../../utils/parsePatterns');
const parsePredictions = require('../../utils/parsePredictions');
const caches = require('../responseCaches');
const lines = caches.lines;
const stops = caches.stops;

const api = app => {
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
    parsePatterns(req.params.op_id, req.params.line_id, data => {
      res.status(200)
         .type('json')
         .send(data);
    });
  });

  // get predictions for an operator id and a stop
  app.get('/api/predictions/:op_id/:stop_id', (req, res) => {
    parsePredictions(req.params.op_id, req.params.stop_id, data => {
      res.status(200)
         .type('json')
         .send(data);
    });
  });
};

module.exports = api;