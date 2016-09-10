const zlib = require('zlib');
const http = require('http');
const lineCache = {};

const processLineIds = (op_id, cb) => {
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
        lineCache[op_id] = data.toString();
        cb(data.toString());
    }));
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}

const parseLineIds = (op_id, cb) => {
  if (lineCache[op_id]) {
    console.log('CACHED LINES: ' + op_id);
    cb(lineCache[op_id])
  } else {
    console.log('NEW LINES: ' + op_id);
    processLineIds(op_id, cb);
  }
};

module.exports = parseLineIds;





