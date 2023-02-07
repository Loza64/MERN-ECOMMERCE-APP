const express = require('express');
const bodyparser = require('body-parser')
const ServerApp = express();
const MongoConnect = require('./Connection/Database')

ServerApp.use(bodyparser.json());
ServerApp.use(bodyparser.urlencoded({extended:true}))
module.exports = ServerApp;