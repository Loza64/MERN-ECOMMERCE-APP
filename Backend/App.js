const express = require('express');
const bodyparser = require('body-parser')
const routes = require('./Routes/api.routes')
const fileupload = require('express-fileupload')
const GetConnection = require('./Connection/Database')
const ServerApp = express()

GetConnection()
ServerApp.use(bodyparser.json())
ServerApp.use(bodyparser.urlencoded({ extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Images' }))
ServerApp.use('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp', routes)

module.exports = ServerApp;