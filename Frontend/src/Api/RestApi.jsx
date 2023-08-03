import axios from 'axios'
import { getCategories, getProductByKey, getProducts, getProductsByCategorie, login, searchProducts, signup } from '../SettingsEnv'

export const Login = async (usuario) => await axios.post(login, usuario)
export const SignUp = async (usuario) => await axios.post(signup, usuario)

export const GetProducts = async () => await axios.get(getProducts)
export const GetCategories = async () => await axios.get(getCategories)
export const SearchProducts = async (Product) => await axios.get(searchProducts + "/" + Product)
export const GetProductByKey = async (ProductKey) => await axios.get(getProductByKey + "/" + ProductKey)
export const GetProductsByCategorie = async (CategoryKey) => await axios.get(getProductsByCategorie + "/" + CategoryKey)