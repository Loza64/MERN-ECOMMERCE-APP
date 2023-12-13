import express from 'express'
import { isAutenticate } from '../Middlewares/CheckSession.js'
import { ValidateSignUp } from '../Validators/UserValidadots.js'
import { ValidateProduct } from '../Validators/ProductValidation.js'
import { ValidationResult } from '../Middlewares/VaidationsResult.js'
import { GetCategories, NewCategorie } from '../Controllers/Categories.js'
import { GetProductByKey, GetProducts, NewProduct } from '../Controllers/Products.js'
import { Login, SignUp, GetSession, GetInfoUser, SessionDestroy } from '../Controllers/Users.js'

const routes = express.Router()

//Post
routes.post('/login', Login)
routes.post('/newcategorie', NewCategorie)
routes.post('/signup', ValidateSignUp, ValidationResult, SignUp)
routes.post('/newproduct', ValidateProduct, ValidationResult, NewProduct)

//Get
routes.get('/getproducts', GetProducts)
routes.get('/getcategories', GetCategories)
routes.get('/getproductbykey/:key', GetProductByKey)
routes.get('/getsession', isAutenticate, GetSession)
routes.get('/getinfouser', isAutenticate, GetInfoUser)
routes.get('/sessiondestroy', isAutenticate, SessionDestroy)

export default routes