import axios from 'axios'

export const Login = async (usuario) => await axios.post(process.env.REACT_APP_LOGIN, usuario)
export const SignUp = async (usuario) => await axios.post(process.env.REACT_APP_SIGNUP, usuario)

export const GetProducts = async () => await axios.get(process.env.REACT_APP_GET_PRODUCTS)
export const GetCategories = async () => await axios.get(process.env.REACT_APP_GET_CATEGORIES)
export const SearchProducts = async (Product) => await axios.get(`${process.env.REACT_APP_SEARCH_PRODUCTS}${Product}`)
export const GetProductByKey = async (ProductKey) => await axios.get(`${process.env.REACT_APP_GET_PRODUCT}${ProductKey}`)
export const GetProductsByCategorie = async (CategoryKey) => await axios.get(`${process.env.REACT_APP_GET_PRODUCTS_BY_CATEGORIE}${CategoryKey}`)