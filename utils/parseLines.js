// fetch will only work in browser
var bodyParser = require('body-parser');
var zlib = require('zlib');
const $ = require('jquery');
const http = require('http');
const fetch = require('node-fetch');
// will work in node, but will require dotenv config

const parseLineIds = (op_id, cb) => {
  const options = { 
    host: 'api.511.org',
    path: `/transit/lines?api_key=${process.env.TRANSIT_API}&operator_id=${op_id}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    }
  };

  http.get( options, res => {
    let chunks = [];
    res.on('data', chunk => { chunks.push(chunk); });
    res.on('end', () => zlib.gunzip(Buffer.concat(chunks), (err, data) => {
      if (err) throw err;
        cb(data.toString());
    }));
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
};

module.exports = parseLineIds;





