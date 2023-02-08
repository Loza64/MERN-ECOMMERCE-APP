const express = require('express')
const { SignUp, Login, GetProducts } = require('../Controllers/controller')
const routes = express.Router()

routes.post('/Login', Login)
routes.post('/SignUp', SignUp)
routes.get('/GetProducts', GetProducts);

module.exports = routes