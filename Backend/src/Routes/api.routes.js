import express from 'express'
import { isAutenticate } from '../Middlewares/CheckSession.js'
import { ValidateSignUp } from '../Validators/UserValidadots.js'
import { ValidateProduct } from '../Validators/ProductValidation.js'
import { ValidationResult } from '../Middlewares/VaidationsResult.js'
import { Login, SignUp, Profile, Logout } from '../Controllers/Users.js'
import { GetCategories, NewCategorie } from '../Controllers/Categories.js'
import { GetProductByKey, GetProducts, NewProduct } from '../Controllers/Products.js'
import { Cart } from '../Controllers/Cart.js'

const routes = express.Router()

//Post
routes.post('/login', Login)
routes.post('/newcategorie', NewCategorie)
routes.post('/signup', ValidateSignUp, ValidationResult, SignUp)
routes.post('/newproduct', ValidateProduct, ValidationResult, NewProduct)

//Get
routes.get('/getproducts', GetProducts)
routes.get('/cart', isAutenticate, Cart)
routes.get('/getcategories', GetCategories)
routes.get('/logout', isAutenticate, Logout)
routes.get('/profile', isAutenticate, Profile)
routes.get('/getproductbykey/:key', GetProductByKey)

export default routes