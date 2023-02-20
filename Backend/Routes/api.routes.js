const express = require('express')
const { SignUp, Login, NewProduct, GetProducts, NewCategorie, GetCategories, GetProductByCategorie } = require('../Controllers/controller')
const routes = express.Router()

//User Routes
routes.post('/Login', Login)
routes.post('/SignUp', SignUp)

//Products Routes
routes.post('/NewProduct', NewProduct)
routes.get('/GetProducts', GetProducts)
routes.post('/GetProductByCategorie', GetProductByCategorie)

//Categorie Routes
routes.post('/NewCategorie', NewCategorie)
routes.get('/GetCategories', GetCategories)

module.exports = routes