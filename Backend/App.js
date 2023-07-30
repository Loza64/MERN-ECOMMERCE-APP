const express = require('express')
const bodyparser = require('body-parser')
const routes = require('./Routes/api.routes')
const fileupload = require('express-fileupload')
const GetConnection = require('./Connection/Database')
const ServerApp = express()

GetConnection()
ServerApp.use(bodyparser.json())
ServerApp.use(bodyparser.urlencoded({ extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Images' }))
ServerApp.use('/ECOMMERCE/SERVER/NODE/ROUTE/API/ECOMMERCESERVER/APP', routes)

module.exports = ServerApp