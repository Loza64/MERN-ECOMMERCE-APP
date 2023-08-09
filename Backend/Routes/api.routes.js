import express from 'express'
import { SignUp, Login, NewProduct, GetProducts, NewCategorie, GetCategories, GetProductsByCategorie, GetProductByKey, SearchProducts } from '../Controllers/controller.js'

const routes = express.Router()

//User Routes
routes.post('/Login', Login)
routes.post('/SignUp', SignUp)

//Products Routes
routes.post('/NewProduct', NewProduct)
routes.get('/GetProducts', GetProducts)
routes.get('/GetProductsByCategorie/:CategoryKey', GetProductsByCategorie)
routes.get('/GetProductByKey/:key', GetProductByKey)
routes.get('/SearchProducts/:product', SearchProducts)

//Categorie Routes
routes.post('/NewCategorie', NewCategorie)
routes.get('/GetCategories', GetCategories)

export default routes