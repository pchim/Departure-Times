// fetch will only work in browser
var zlib = require('zlib');
const http = require('http');
const fetch = require('node-fetch');
const stops = require('../server/responseCaches').stops;
// will work in node, but will require dotenv config

const parseStops = (op_id, cb) => {
  // retrieve all stops from cache, we would normally get this from stops api below
  const stopPoints = stops.Contents.dataObjects.ScheduledStopPoint;
  // create hash of ids: names and location
  const stopHash = {};
  stopPoints.forEach(stop => {
    stopHash[stop.id] = { name: stop["Name"], lat: stop.Location["Latitude"], lon: stop.Location["Longitude"] };
  });

  // returns a json
  cb(stopHash);



  /*
  const options = { 
    host: 'api.511.org',
    path: `/transit/stops?api_key=${process.env.TRANSIT_API}&operator_id=${op_id}`,
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
        cb(data.toString());  // turn this into json
    }));
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
  */
};

//parseStops(null, data => console.log(data));

module.exports = parseStops;





