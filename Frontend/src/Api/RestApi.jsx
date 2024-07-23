import axios from 'axios'

const ServerRoute = import.meta.env.VITE_ROUTE_SERVER

const ServerFetch = axios.create({
    baseURL: ServerRoute,
    timeout: 1000 * 60 * 5,
    headers: { "Content-Type": "application/json" },
    timeoutErrorMessage: "Server timeout has expired"
})

//------------------------------------post-----------------------------------------------

//User
export const Login = async (usuario) => await ServerFetch.post('/login', usuario)
export const SignUp = async (usuario) => await ServerFetch.post('/signup', usuario)

//Sales
export const MakePurchase = async (body) => await ServerFetch.post('/makepurchase', body)
export const GetPurchasesByUser = async (User, Page) => await ServerFetch(`/getpurchasesbyuser?User=${User}&Page=${Page}`)

//------------------------------------get-----------------------------------------------

//Cart
export const GetCart = async () => await ServerFetch.get('/cart')
export const ClearCart = async () => await ServerFetch.get('/clearcart')
export const AddToCart = async (Key) => await ServerFetch.get(`/addtocart/${Key}`)
export const Quantity = async (Key, Type) => await ServerFetch.get(`/quantity/${Key}/${Type}`)
export const RemoveProductFromCart = async (Key) => await ServerFetch.get(`/removetocart/${Key}`)

//User
export const Logout = async () => await ServerFetch.get('/logout')
export const Profile = async () => await ServerFetch.get('/profile')

//Product
export const GetCategories = async () => await ServerFetch.get('/getcategories')
export const GetProductByName = async (Product, Page) => await ServerFetch.get(`/getproductbyname/${Product}?Page=${Page}`)
export const GetProducts = async (Search, Categorie, Type, Page) => await ServerFetch.get(`/getproducts?Search=${Search}&Categorie=${Categorie}&Type=${Type}&Page=${Page}`)

