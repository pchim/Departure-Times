const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const useApi = require('./routes/api.js');
const config = require('./config.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../index.html'));
});
useApi(app);

const server = app.listen(config.api.port);
