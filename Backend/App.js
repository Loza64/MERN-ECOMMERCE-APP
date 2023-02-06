const express = require('express');
const ServerApp = express();
const MongoConnect = require('./Connection/Database')

MongoConnect();
ServerApp.use(express.json());
ServerApp.use(express.urlencoded({extended:true}))
module.exports = ServerApp;