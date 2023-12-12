import express from 'express'
import { ValidateSignUp } from '../Validators/UserValidadots.js'
import { Login, SignUp, CheckToken, GetUserSession } from '../Controllers/Users.js'
import { ValidationResult } from '../Middlewares/VaidationsResult.js'
import { GetCategories, NewCategorie } from '../Controllers/Categories.js'
import { GetProductByKey, GetProducts, NewProduct } from '../Controllers/Products.js'
import { ValidateProduct } from '../Validators/ProductValidation.js'
import { isAutenticate } from '../Middlewares/CheckSession.js'

const routes = express.Router()

//User Routes
routes.post('/login', Login)
routes.post('/signup', ValidateSignUp, ValidationResult, SignUp)
routes.get('/verifytoken/:TokenKey', CheckToken)
routes.get('/getusersession', isAutenticate, GetUserSession)

//Products Routes
routes.post('/newproduct', ValidateProduct, ValidationResult, NewProduct)
routes.get('/getproducts', GetProducts)
routes.get('/getproductbykey/:key', GetProductByKey)

//Categorie Routes
routes.post('/newcategorie', NewCategorie)
routes.get('/getcategories', GetCategories)

export default routes