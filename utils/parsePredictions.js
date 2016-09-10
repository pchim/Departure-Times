const http = require('http');
const zlib = require('zlib');

const processPredictions = (predictionObj, cb) => {
  let predictions = JSON.parse(predictionObj).ServiceDelivery;
  let timeStamp = predictions.StopMonitoringDelivery.ResponseTimestamp;
  let monitors = predictions.StopMonitoringDelivery.MonitoredStopVisit;
  let monitoredVehicles = monitors.map((monitor, i) =>
    ({ 
      id: `${i}-${monitor.MonitoredVehicleJourney.LineRef}`,
      info: {
        name: monitor.MonitoredVehicleJourney.PublishedLineName,
        line: monitor.MonitoredVehicleJourney.LineRef,
        lat: monitor.MonitoredVehicleJourney.VehicleLocation.Latitude,
        lon: monitor.MonitoredVehicleJourney.VehicleLocation.Longitude,
      },
      arrivalTime: monitor.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime,
      timeStamp: timeStamp
    }));
  monitoredVehicles.sort((a, b) => parseInt(a.info.line) > parseInt(b.info.line));
  cb(monitoredVehicles);
};

const parsePredictions = (op_id, stop_id, cb) => {
  op_id = op_id.toLowerCase() === 'sfmta' ? 'SF-MUNI' : op_id;
  const options = { 
    host: 'api.511.org',
    path: `/transit/StopMonitoring?api_key=${process.env.TRANSIT_API}&agency=${op_id}&stopCode=${stop_id}`,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    }
  };

  http.get(options, res => {
    let chunks = [];
    res.on('data', chunk => { chunks.push(chunk); });
    res.on('end', () => zlib.gunzip(Buffer.concat(chunks), (err, data) => {
      if (err) throw err;
        processPredictions(data.toString('utf8').replace(/[\0\ufeff]/g, ''), cb);
    }));
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
};

module.exports = parsePredictions;