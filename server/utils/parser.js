const zlib = require('zlib');
const http = require('http');

const Parser = function() {};
Parser.prototype.getLines = require('../../utils/parseLines');
Parser.prototype.getStops = require('../../utils/parseStops');
Parser.prototype.getPatterns = require('../../utils/parsePatterns');
Parser.prototype.getPredictions = require('../../utils/parsePredictions');
module.exports = new Parser();
