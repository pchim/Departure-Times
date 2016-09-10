// fetch will only work in browser
var zlib = require('zlib');
const http = require('http');
const fetch = require('node-fetch');
const stops = require('../server/responseCaches').stops;
// will work in node, but will require dotenv config
const stopCache = {};

const createStopHash = (stops, op_id, cb) => {
  const stopHash = {};
  JSON.parse(stops).Contents.dataObjects.ScheduledStopPoint.forEach(stop => {
    stopHash[stop.id] = { name: stop["Name"], lat: stop.Location["Latitude"], lon: stop.Location["Longitude"] };
  });
  stopCache[op_id] = stopHash;
  cb(stopHash);
}

const processStops = (op_id, cb) => {
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
        createStopHash(data.toString('utf8').replace(/[\0\ufeff]/g, ''), op_id, cb);  // turn this into json
    }));
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}

const parseStops = (op_id, cb) => {
  // retrieve all stops from cache, we would normally get this from stops api below
  const stopPoints = stopCache[op_id]; 
  // create hash of ids: names and location
  if (stopCache[op_id]) {
    console.log('CACHED STOPS: ' + op_id);
    cb(stopCache[op_id])
  } else {
    console.log('NEW STOPS: ' + op_id);
    const stopHash = {};
    stops.Contents.dataObjects.ScheduledStopPoint.forEach(stop => {
      stopHash[stop.id] = { name: stop["Name"], lat: stop.Location["Latitude"], lon: stop.Location["Longitude"] };
    });
    stopCache[op_id] = stopHash;
    cb(stopHash);

    //processStops(op_id, cb);
  }
};

//parseStops(null, data => console.log(data));

module.exports = parseStops;





