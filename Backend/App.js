const express = require('express')
const { NODE_ENV } = require('./Config')
const bodyparser = require('body-parser')
const routes = require('./Routes/api.routes')
const fileupload = require('express-fileupload')
const GetConnection = require('./Connection/Database')
const path = require('path')
const ServerApp = express()

GetConnection()
ServerApp.use(bodyparser.json())
ServerApp.use(bodyparser.urlencoded({ extended: true }))
ServerApp.use(fileupload({ useTempFiles: true, tempFileDir: './Images' }))
ServerApp.use('/ECOMMERCE/SERVER/NODE/ROUTE/API/ECOMMERCESERVER/APP', routes)

if (NODE_ENV === "productions") {
    ServerApp.use(express.static(path.join(__dirname, '../Frontend/build')));
    ServerApp.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend', 'build', 'index.html'))
    })
} else {
    ServerApp.get('/', (req, res) => {
        res.send("La pagina esta en mantenimiento, recarga la pagina de nuevo o vuelve más tarde, lamentamos los inconvenientes :(")
    })
}

module.exports = ServerApp