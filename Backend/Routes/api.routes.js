const express = require('express')
const { SignUp, Login, NewProduct, GetProducts, NewCategorie, GetCategories } = require('../Controllers/controller')
const routes = express.Router()

routes.post('/Login', Login)
routes.post('/SignUp', SignUp)
routes.post('/NewProduct', NewProduct)
routes.get('/GetProducts', GetProducts)
routes.post('/NewCategorie', NewCategorie)
routes.get('/GetCategories', GetCategories)

module.exports = routes