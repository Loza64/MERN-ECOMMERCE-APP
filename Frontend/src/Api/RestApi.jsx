import axios from 'axios'
import { ServerRoute } from '../SettingsEnv'

const ServerFetch = axios.create({
    baseURL: ServerRoute,
    withCredentials: true,
    timeout: 1000 * 60 * 5,
    headers: { "Content-Type": "multipart/form-data" },
    timeoutErrorMessage: "Server timeout has expired"
})

//post
export const Login = async (usuario) => await ServerFetch.post('/login', usuario)
export const SignUp = async (usuario) => await ServerFetch.post('/signup', usuario)

//get

//Cart
export const GetCart = async () => await ServerFetch.get('/cart')
export const AddToCart = async (Key) => await ServerFetch.get(`/addtocart/${Key}`)
export const Quantity = async (Key, Type) => await ServerFetch.get(`/quantity/${Key}/${Type}`)

//User
export const Logout = async () => await ServerFetch.get('/logout')
export const Profile = async () => await ServerFetch.get('/profile')

//Product
export const GetCategories = async () => await ServerFetch.get('/getcategories')
export const GetProductByName = async (Product) => await ServerFetch.get(`/getproductbyname/${Product}`)
export const GetProducts = async (Search, Categorie, Page) => await ServerFetch.get(`/getproducts?Search=${Search}&Categorie=${Categorie}&Page=${Page}`)