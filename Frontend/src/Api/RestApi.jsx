import axios from 'axios'
import { ServerRoute } from '../SettingsEnv'

const ServerFetch = axios.create({
    baseURL: ServerRoute,
    timeout: 1000 * 60 * 3,
    headers: { "Content-Type": "application/json" },
    timeoutErrorMessage: "Server timeout has expired"
})

export const Login = async (usuario) => await ServerFetch.post('/Login', usuario)
export const SignUp = async (usuario) => await ServerFetch.post('/SignUp', usuario)

export const GetProducts = async () => await ServerFetch.get('/GetProducts')
export const GetCategories = async () => await ServerFetch.get('/GetCategories')
export const SearchProducts = async (Product) => await ServerFetch.get(`/SearchProducts/${Product}`)
export const GetProductByKey = async (ProductKey) => await ServerFetch.get(`/GetProductByKey/${ProductKey}`)
export const GetProductsByCategorie = async (CategoryKey) => await ServerFetch.get(`/GetProductsByCategorie/${CategoryKey}`)