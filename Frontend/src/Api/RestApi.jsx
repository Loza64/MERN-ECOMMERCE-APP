import axios from 'axios'
import { ServerRoute } from '../SettingsEnv'

const ServerFetch = axios.create({
    baseURL: ServerRoute,
    timeout: 1000 * 60 * 3,
    headers: { "Content-Type": "application/json" },
    timeoutErrorMessage: "Server timeout has expired"
})

export const Login = async (usuario) => await ServerFetch.post('/login', usuario)
export const SignUp = async (usuario) => await ServerFetch.post('/signup', usuario)

export const GetProducts = async () => await ServerFetch.get('/getproducts')
export const GetCategories = async () => await ServerFetch.get('/getcategories')
export const SearchProducts = async (Product) => await ServerFetch.get(`/searchproducts/${Product}`)
export const GetProductByKey = async (ProductKey) => await ServerFetch.get(`/getproductbykey/${ProductKey}`)
export const GetProductsByCategorie = async (CategoryKey) => await ServerFetch.get(`/getproductsbycategorie/${CategoryKey}`)