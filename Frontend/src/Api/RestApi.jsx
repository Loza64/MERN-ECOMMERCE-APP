import axios from 'axios'
import { ServerRoute } from '../SettingsEnv'

const ServerFetch = axios.create({
    baseURL: ServerRoute,
    timeout: 1000 * 60 * 3,
    headers: { "Content-Type": "multipart/form-data" },
    timeoutErrorMessage: "Server timeout has expired"
})

//post
export const Login = async (usuario) => await ServerFetch.post('/login', usuario)
export const SignUp = async (usuario) => await ServerFetch.post('/signup', usuario)


//get
export const GetCategories = async () => await ServerFetch.get('/getcategories')
export const GetProductByKey = async (ProductKey) => await ServerFetch.get(`/getproductbykey/${ProductKey}`)
export const GetProducts = async (Search, Categorie, Page) => await ServerFetch.get(`/getproducts?Search=${Search}&Categorie=${Categorie}&Page=${Page}`)