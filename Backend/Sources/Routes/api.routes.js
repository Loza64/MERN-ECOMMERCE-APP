import express from 'express'
import { MakePurchase, GetPurchaseByUser } from '../Controllers/Purchase.js'
import { isAuthenticate } from '../Middlewares/CheckSession.js'
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
routes.get('/logout', Logout)
routes.get('/profile', isAuthenticate, Profile)
routes.post('/signup', ValidateSignUp, ValidationResult, SignUp)

//Products
routes.get('/getproducts', GetProducts)
routes.post('/newcategorie', NewCategorie)
routes.get('/getcategories', GetCategories)
routes.get('/getproductbyname/:Name', GetProductByName)
routes.post('/newproduct', ValidateProduct, ValidationResult, NewProduct)

// Cart
routes.get('/cart', isAuthenticate, Cart)
routes.get('/clearcart', isAuthenticate, ClearCart)
routes.get('/addtocart/:Key', isAuthenticate, AddToCart)
routes.get('/quantity/:Key/:Type', isAuthenticate, Quantity)
routes.get('/removetocart/:Key', isAuthenticate, RemoveProductFromCart)

//Purchages
routes.post('/makepurchase', isAuthenticate, MakePurchase)
routes.get('/getpurchasesbyuser', isAuthenticate, GetPurchaseByUser)

export default routes