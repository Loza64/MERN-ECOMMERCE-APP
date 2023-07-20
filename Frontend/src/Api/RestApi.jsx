import axios from 'axios'

export const Login = async (usuario) => await axios.post('/EcommerceApp/Login', usuario)
export const SignUp = async (usuario) => await axios.post('/EcommerceApp/SignUp', usuario)

export const GetProducts = async () => await axios.get('/EcommerceApp/GetProducts')
export const GetCategories = async () => await axios.get('/EcommerceApp/GetCategories')
export const SearchProducts = async (Product) => await axios.get(`/EcommerceApp/SearchProducts/${Product}`)
export const GetProductByKey = async (ProductKey) => await axios.get(`/EcommerceApp/GetProductByKey/${ProductKey}`)
export const GetProductsByCategorie = async (CategoryKey) => await axios.get(`/EcommerceApp/GetProductsByCategorie/${CategoryKey}`)