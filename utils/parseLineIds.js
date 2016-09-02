// fetch will only work in browser
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var zlib = require('zlib');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const $ = require('jquery');
const http = require('http');
const fetch = require('node-fetch');
require('dotenv').config();
const parseLineIds = op_id => {
  // $.get(`http://api.511.org/transit/lines?api_key=${process.env.TRANSIT_API}&operator_id=${op_id}`,
  //   null,
  //   data => console.log(data),
  //   'json');

  // fetch(`http://api.511.org/transit/lines?api_key=${process.env.TRANSIT_API}&operator_id=${op_id}`,
  //   null,
  //   data => console.log(data),
  //   'json');

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
    console.log(data.toString());
  }));
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});


};
parseLineIds('SFMTA');