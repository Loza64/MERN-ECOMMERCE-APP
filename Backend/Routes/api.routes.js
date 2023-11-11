import express from 'express'
import { SignUp, Login, NewProduct, GetProducts, NewCategorie, GetCategories, GetProductsByCategorie, GetProductByKey, SearchProducts } from '../Controllers/controller.js'

const routes = express.Router()

//User Routes
routes.post('/login', Login)
routes.post('/signup', SignUp)

//Products Routes
routes.post('/newproduct', NewProduct)
routes.get('/getproducts', GetProducts)
routes.get('/getproductsbycategorie/:categorykey', GetProductsByCategorie)
routes.get('/getproductbykey/:key', GetProductByKey)
routes.get('/searchproducts/:product', SearchProducts)

//Categorie Routes
routes.post('/newcategorie', NewCategorie)
routes.get('/getcategories', GetCategories)

export default routes