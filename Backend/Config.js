const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  ConnectionCloud: process.env.MONGODB_URI_CLOUD,
  PORT: process.env.PORT,
  ApiKey: process.env.API_KEY,
  CloudName: process.env.CLOUD_NAME,
  ApiSecret: process.env.API_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  MAIL_BUSINESS: process.env.MAIL_BUSINESS,
  MAIL_PASS: process.env.MAIL_PASS
}