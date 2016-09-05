const parseLines = require('../../utils/parseLines');
const parseStops = require('../../utils/parseStops');
const parsePatterns = require('../../utils/parsePatterns');
const parsePredictions = require('../../utils/parsePredictions');
const Parser = require('../utils/parser');
const caches = require('../responseCaches');
const lines = caches.lines;
const stops = caches.stops;

const api = app => {
  // get lines for an operator id
  app.get('/api/lines/:op_id', (req, res) => {
    // check if cached
    if (lines) {
      res.send(JSON.stringify(lines, null, ' '));
    } else
      Parser.getLines(req.params.op_id, data => {
        res.status(200)
           .type('json')
           .send(data);
      });
  });

  // get stops for an operator id and a line
  app.get('/api/stops/:op_id/:line_id', (req, res) => {
    console.log('Getting Stops for Line: ' + req.params.line_id);
    Parser.getPatterns(req.params.op_id, req.params.line_id, data => {
      res.status(200)
         .type('json')
         .send(data);
    });
  });

  // get predictions for an operator id and a stop
  app.get('/api/predictions/:op_id/:stop_id', (req, res) => {
    console.log('Getting Predictions for Stop: ' + req.params.stop_id);
    Parser.getPredictions(req.params.op_id, req.params.stop_id, data => {
      res.status(200)
         .type('json')
         .send(data);
    });
  });
};

module.exports = api;