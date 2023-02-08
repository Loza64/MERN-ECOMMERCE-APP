const express = require('express');
const bodyparser = require('body-parser')
const routes = require('./Routes/api.routes')
const { PORT } = require('../Backend/Config')
const fileupload = require('express-fileupload')
const GetConnection = require('./Connection/Database')
const ServerApp = express()

ServerApp.use(bodyparser.json())
ServerApp.use(bodyparser.urlencoded({ extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Images' }))

GetConnection()
ServerApp.use('/ServerCommerce', routes)
ServerApp.get('/', (req, res) => {
  res.send(`The Server is running on port: ${PORT}`);
})

module.exports = ServerApp;