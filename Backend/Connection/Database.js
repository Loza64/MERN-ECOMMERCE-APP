const mongoose = require('mongoose');
const { ConnectionCloud } = require('../Config')
 
function GetConnection() {
  try {
    mongoose.connect(ConnectionCloud,usem)
    console.log('Connection to database succes');
  } catch (error) {
    console.error(error);
  }
}

module.exports = GetConnection;