const mongoose = require('mongoose')
const { ConnectionCloud } = require('../Config')
 
const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

function GetConnection() {
  mongoose.set('strictQuery',true)
  mongoose.connect(ConnectionCloud)
  mongoose.connection.on('open', ()=>{
    console.log("Connection to Database succes.")
  })
  mongoose.connection.on('error', err =>{
    console.error(err)
  })
}

module.exports = GetConnection();