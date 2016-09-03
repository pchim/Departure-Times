// fetch will only work in browser
var bodyParser = require('body-parser');
var zlib = require('zlib');
const $ = require('jquery');
const http = require('http');
const fetch = require('node-fetch');
const parseStops = require('./parseStops');
// will work in node, but will require dotenv config

// initialize ids hash to include blacklisted 'Not a public stop' names
const allOB = [];
const seqOB = [];
const idsOB = { '17520': true };
const allIB = [];
const seqIB = [];
const idsIB = { '17520': true };
// holds all stop ids and names
let idsHash = {};

const processAll = (allxB, points, timePoints) => {
  let len = points.length + timePoints.length;
  allxB.push({ len, points, timePoints });
};

const createSeq = (seqxB, idsxB, currxB) => {
  let points = currxB.points;
  let timePoints = currxB.timePoints;
  let p = 0;
  let t = 0;

  const checkHash = point => {
    let stop = point.ScheduledStopPointRef;
    if (!idsxB[stop]) {
      seqxB.push(stop);
      idsxB[stop] = true;
    }
  }

  while (p < points.length && t < timePoints.length) {
    if (parseInt(timePoints[t].Order) < parseInt(points[p].Order)) {
      checkHash(timePoints[t]);
      t++;
    } else {
      checkHash(points[p]);
      p++;
    }
  }
  while (p < points.length) {
    checkHash(points[p]);
    p++;    
  }
  while (t < timePoints.length) {
    checkHash(timePoints[t]);
    t++;    
  }
}

const createAllSeq = (allxB, seqxB, idsxB) => {
  while (allxB.length) {
    let maxLen = 0;
    let maxInd = -1;
    for (let i = 0; i < allxB.length; i++) {
      if (allxB[i].len > maxLen) {
        maxLen = allxB[i].len;
        maxInd = i;
      }
    }
    let currxB = allxB.splice(maxInd, 1)[0];
    createSeq(seqxB, idsxB, currxB);
  }
  let seq = seqxB.map(id => ({id, info: idsHash[id]}));
  console.log(seq);
  console.log(seqxB.length);
};


const parsePatterns = (op_id, line_id, cb) => {
  // assuming we have all of the stops in a hash
  parseStops(op_id, stopHash => {
    idsHash = stopHash;
    // we would get normally this from an http request to api.511.org
    const patterns = require('../server/responseCaches').patterns.journeyPatterns;

    // find inbound array
    for (let i = 0; i < patterns.length; i++) {
      let pattern = patterns[i];
      let last = false;
      if (i === patterns.length - 1) {
        last = true;
      }
      if (pattern.DirectionRef === "OB") {
        processAll(allOB, pattern.PointsInSequence.StopPointInJourneyPattern,
                  pattern.PointsInSequence.TimingPointInJourneyPattern);
      } else if (pattern.DirectionRef === "IB") {
        processAll(allIB, pattern.PointsInSequence.StopPointInJourneyPattern,
                  pattern.PointsInSequence.TimingPointInJourneyPattern);
      }

    }

    createAllSeq(allOB, seqOB, idsOB);
    createAllSeq(allIB, seqIB, idsIB);
  });

  // const options = { 
  //   host: 'api.511.org',
  //   path: `/transit/lines?api_key=${process.env.TRANSIT_API}&operator_id=${op_id}&line_id=${line_id}`,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accept-Encoding': 'gzip, deflate',
  //   }
  // };

  // http.get( options, res => {
  //   let chunks = [];
  //   res.on('data', chunk => { chunks.push(chunk); });
  //   res.on('end', () => zlib.gunzip(Buffer.concat(chunks), (err, data) => {
  //     if (err) throw err;
  //       cb(data.toString());
  //   }));
  // }).on('error', (e) => {
  //   console.log(`Got error: ${e.message}`);
  // });
};
parsePatterns();
module.exports = parsePatterns;





