const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  Port : process.env.PORT,
  ConnectionCloud : process.env.MONGODB_URI_CLOUD
};