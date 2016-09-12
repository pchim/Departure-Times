if (process.env.NODE_ENV !== 'production')
  require('dotenv').config();

const config = {
  api: {
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8000,
  },
};

module.exports = config;