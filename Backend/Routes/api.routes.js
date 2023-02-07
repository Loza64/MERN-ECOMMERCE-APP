const express = require('express')
const { SignUp, Login } = require('../Controllers/controller')
const routes = express.Router()

routes.post('/Login', Login)
routes.post('/SignUp', SignUp)

module.exports = routes