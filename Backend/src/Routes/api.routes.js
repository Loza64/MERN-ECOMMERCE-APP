import express from 'express'
import { isAutenticate } from '../Middlewares/CheckSession.js'
import { ValidateSignUp } from '../Validators/UserValidadots.js'
import { ValidateProduct } from '../Validators/ProductValidation.js'
import { ValidationResult } from '../Middlewares/VaidationsResult.js'
import { Login, SignUp, Profile, Logout } from '../Controllers/Users.js'
import { GetCategories, NewCategorie } from '../Controllers/Categories.js'
import { GetProductByName, GetProducts, NewProduct } from '../Controllers/Products.js'
import { AddToCart, Cart, ClearCart, Quantity, RemoveProductFromCart } from '../Controllers/Cart.js'

const routes = express.Router()

//User
routes.post('/login', Login)
routes.get('/logout', isAutenticate, Logout)
routes.get('/profile', isAutenticate, Profile)
routes.post('/signup', ValidateSignUp, ValidationResult, SignUp)

//Products
routes.get('/getproducts', GetProducts)
routes.post('/newcategorie', NewCategorie)
routes.get('/getcategories', GetCategories)
routes.get('/getproductbyname/:Name', GetProductByName)
routes.post('/newproduct', ValidateProduct, ValidationResult, NewProduct)

// Cart
routes.get('/cart', isAutenticate, Cart)
routes.get('/clearcart', isAutenticate, ClearCart)
routes.get('/addtocart/:Key', isAutenticate, AddToCart)
routes.get('/quantity/:Key/:Type', isAutenticate, Quantity)
routes.get('/removetocart/:Key', isAutenticate, RemoveProductFromCart)

export default routes