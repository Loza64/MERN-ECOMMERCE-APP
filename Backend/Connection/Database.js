const mongoose = require('mongoose')
const { ConnectionCloud } = require('../Config')

function GetConnection() {
  mongoose.set('strictQuery', true)
  mongoose.connect(ConnectionCloud, { useNewUrlParser: true })
  mongoose.connection.on('open', () => {
    console.log("Connection to Database succes.")
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })
}

module.exports = GetConnection();