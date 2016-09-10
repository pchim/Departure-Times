// fetch will only work in browser
const zlib = require('zlib');
const http = require('http');
const parseStops = require('./parseStops');
// will work in node, but will require dotenv config

// initialize ids hash to include blacklisted 'Not a public stop' names
let allOB = [];
let seqOB = [];
let adrOB = {};
let idsOB = { '17520': true };
let allIB = [];
let seqIB = [];
let adrIB = {};
let idsIB = { '17520': true };
// holds all stop ids and names
let idsHash = {};
let seqData = {};

let patternCache = {};

const initPattern = () => {
  console.log('Initializing New Pattern:');
  allOB = [];
  seqOB = [];
  adrOB = {};
  idsOB = { '17520': true };
  allIB = [];
  seqIB = [];
  adrIB = {};
  idsIB = { '17520': true };
  idsHash = {};
  seqData = {};
};

const processAll = (allxB, points, timePoints) => {
  let len = points.length + timePoints.length;
  allxB.push({ len, points, timePoints });
};

const createSeq = (seqxB, idsxB, adrxB, currxB) => {
  let points = currxB.points;
  let timePoints = currxB.timePoints;
  let p = 0;
  let t = 0;

  const checkHash = point => {
    let stop = point.ScheduledStopPointRef;
    if (!idsxB[stop]) {
      if(!adrxB[idsHash[stop].name]) {
        seqxB.push(stop);
        adrxB[idsHash[stop].name] = true;
      }
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

const createAllSeq = (allxB, seqxB, idsxB, adrxB, xB) => {
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
    createSeq(seqxB, idsxB, adrxB, currxB);
  }
  // map relevant data
  let seq = seqxB.map(id => ({id, info: idsHash[id]}));
  seqData[xB] = seq;
};

const processPattern = (patternObj, op_id, line_id, cb) => {
  // find inbound array
  const patterns = JSON.parse(patternObj)["journeyPatterns"];
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

  createAllSeq(allOB, seqOB, idsOB, adrOB, 'OB');
  createAllSeq(allIB, seqIB, idsIB, adrIB, 'IB');
  if (!patternCache[op_id])
    patternCache[op_id] = {};

  patternCache[op_id][line_id] = seqData;
  cb(seqData);
}

const parsePatterns = (op_id, line_id, cb) => {
  if (patternCache[op_id] && patternCache[op_id][line_id]) {
    if (patternCache[op_id][line_id]) {
      console.log('CACHED: ' + op_id + line_id);
      cb(patternCache[op_id][line_id]);
    }
  } else {
    initPattern();
    parseStops(op_id, stopHash => {
      idsHash = stopHash;
      const options = { 
        host: 'api.511.org',
        path: `/transit/patterns?api_key=${process.env.TRANSIT_API}&operator_id=${op_id}&line_id=${line_id}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
        }
      };

      http.get( options, res => {
        let chunks = [];
        res.on('data', chunk => { chunks.push(chunk) });
        res.on('end', () => zlib.unzip(Buffer.concat(chunks), (err, data) => {
          if (err) console.error(err);
            processPattern(data.toString('utf8').replace(/[\0\ufeff]/g, ''), op_id, line_id, cb);
        }));
      }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
      });
    });
  }
};



module.exports = parsePatterns;





